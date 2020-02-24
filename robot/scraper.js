/** @format */

const fetch = require('isomorphic-fetch')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const sequelize = require('sequelize')

const { get: getNPMStats } = require('download-stats')
const { parse: parseMarkdown } = require('remark')

const { githubAPIKey } = require('../utils/consts')
const errorsLocation = path.resolve(__dirname, 'errors.json')
const repoLocation = path.resolve(__dirname, 'links')
const fileBlacklist = ['.git', '.github', 'README.md']

const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/( ?- ?)|\/| /g, '-')
        .replace(/[^-\w]/g, '')

const fetchJSON = async (uri) =>
    fetch(uri, { headers: { Authorization: 'token ' + githubAPIKey } }).then((r) => r.json())

const githubURLRegex = /^https:\/\/(www.)?github.com\/[^\s]+\/[^\s]+$/
const findGithubUrl = (urls) => {
    for (let url of urls) {
        if (url.match(githubURLRegex)) {
            return [url, urls.filter((x) => x !== url)]
        }
    }
    return [null, urls]
}

if (!fs.existsSync(repoLocation)) {
    console.error(`Error: the path '${repoLocation}' does not exist!
    Please run 'git clone https://github.com/markerikson/redux-ecosystem-links.git links'
    in the robot/ directory.

    Aborting...`)
    process.exit(0)
}

const gitDir = path.resolve(repoLocation, '.git')
console.log('Found Git repo of redux-ecosystem-links. Displaying latest log...')
execSync(`git --git-dir=${gitDir} log --oneline -n 1`, { stdio: 'inherit' })

const progress = ora('Reading files...').start()
const final = []
const parsingErrors = []

for (let fileName of fs.readdirSync(repoLocation)) {
    if (fileBlacklist.indexOf(fileName) > -1) continue
    progress.text = fileName
    const fileContents = fs.readFileSync(path.resolve(repoLocation, fileName), {
        encoding: 'utf-8',
    })
    const ast = parseMarkdown(fileContents)

    let category = {
        name: null,
        slug: null,
        subcategories: [],
    }
    let subcategory = {
        name: null,
        slug: null,
        repositories: [],
    }

    for (let child of ast.children) {
        if (child.type === 'heading' && child.depth === 3) {
            if (category.name) {
                parsingErrors.push({
                    fileName,
                    subcategoryName: subcategory.name,
                    message: `Error: duplicate category header found "${child.children[0].value}". Aborting file!`,
                })
                break
            }
            const header = child.children[0].value
            category = {
                name: header,
                slug: slugify(header),
                subcategories: [],
            }
            final.push(category)
        }

        if (child.type === 'heading' && child.depth === 4) {
            if (!category) {
                parsingErrors.push({
                    fileName,
                    subcategoryName: subcategory.name,
                    message: `Error: found subcategory without category header "${subcategory}". Aborting file!`,
                })
                break
            }
            const header = child.children[0].value
            subcategory = {
                name: header,
                slug: slugify(header),
                repositories: [],
            }
            category.subcategories.push(subcategory)
        }

        if (child.type === 'list') {
            // If the first paragraph does not have a title, link, and description (and 2 breaks), then skip.
            const firstParagraph = child.children[0].children[0]
            if (firstParagraph.children.length < 5) {
                parsingErrors.push({
                    fileName,
                    subcategoryName: subcategory.name,
                    message: 'Warning: skipping list in category because not a list of repos',
                })
                if (category.subcategories.length) category.subcategories.pop()
                continue
            }

            // Check for single header files (with no subcategories) like routing.md
            if (!subcategory.name) {
                parsingErrors.push({
                    fileName,
                    subcategoryName: subcategory.name,
                    message: 'Warning: assuming this file has no subcategories',
                })

                subcategory = {
                    name: null,
                    slug: null,
                    repositories: [],
                }
                category.subcategories.push(subcategory)
            }

            for (let listItem of child.children) {
                const repository = {
                    name: '',
                    description: '',
                    githubURL: null,
                    altURLs: [],
                }

                for (let content of listItem.children[0].children) {
                    // Project title
                    if (content.type === 'strong' && !repository.name) {
                        repository.name = content.children[0].value
                        continue
                    }

                    // Project link(s)
                    if (content.type === 'link' && !repository.description) {
                        repository.altURLs.push(content.url)
                        continue
                    }

                    // Project description
                    if (content.type === 'text' || content.type === 'inlineCode') {
                        repository.description += content.value
                    } else if (
                        content.type === 'link' ||
                        content.type === 'strong' ||
                        content.type === 'emphasis'
                    ) {
                        repository.description += content.children[0].value
                    }
                }

                ;[repository.githubURL, repository.altURLs] = findGithubUrl(repository.altURLs)

                subcategory.repositories.push(repository)
            }
        }
    }
}

const totalCount = final.reduce(
    (count, cat) =>
        count + cat.subcategories.reduce((subCount, sub) => subCount + sub.repositories.length, 0),
    0,
)
progress.succeed(
    `Parsed files with ${parsingErrors.length} warnings.
  Found ${totalCount} total repositories/projects.`,
)

const makeGithubQuery = (owner, name) => `
    repository(name: "${name}", owner: "${owner}") {
        name
        stargazers {
            totalCount
        }
        isArchived
        pushedAt
        url
        releases(last: 1) {
            nodes {
                createdAt
            }
        }
    }
`

const batchGithubRequest = async (projects) => {
    const queries = projects.map((project, i) => {
        if (!project.githubURL) return ''
        const [, , , repoOwner, repoName, ...stuff] = project.githubURL.split('/')
        return `repo${i}: ` + makeGithubQuery(repoOwner, repoName)
    })
    const masterQuery = `query { ${queries.join(' ')} }`

    const r = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + githubAPIKey,
        },
        body: JSON.stringify({ query: masterQuery }),
    })
    const { data, errors } = await r.json()
    if (!data) {
        return { projects, errors }
    }
    projects = projects.map((project, index) => {
        const repo = data['repo' + index] || {}
        const lastRelease = repo.releases && repo.releases[0] && repo.releases[0].createdAt

        return {
            name: repo.name || project.name,
            description: project.description,
            githubURL: repo.url || project.url,
            altURLs: project.altURLs || [],
            githubStars: repo.stargazers && repo.stargazers.totalCount,
            lastRelease,
            npmDownloadsThisMonth: project.npmDownloadsThisMonth,
        }
    })

    return { projects, errors }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})

async function main() {
    let asyncErrors = []
    const catCount = final.length
    for (let currentCategory in final) {
        const category = final[currentCategory]

        const totalCount = category.subcategories.reduce(
            (subCount, sub) => subCount + sub.repositories.length,
            0,
        )

        const progress = ora('').start()

        for (let index in category.subcategories) {
            const length = category.subcategories.length
            const subcategory = category.subcategories[index]

            progress.text =
                `(${parseInt(currentCategory) + 1}/${catCount}) ${category.slug} -` +
                ` ${parseInt(index) + 1}/${length} ${subcategory.slug}`
            try {
                const { projects, errors } = await batchGithubRequest(subcategory.repositories)

                if (errors)
                    asyncErrors.push({ where: `${category.slug}/${subcategory.slug}`, errors })

                subcategory.repositories = await Promise.all(
                    projects.map(async (project) => {
                        const npmDownloadsThisMonth = await new Promise((resolve) => {
                            getNPMStats.lastMonth(project.name, (err, results) =>
                                resolve(err ? 0 : results.downloads),
                            )
                        })

                        return {
                            ...project,
                            npmDownloadsThisMonth,
                        }
                    }),
                )
            } catch (err) {
                asyncErrors.push({
                    where: category.slug + '/' + subcategory.slug,
                    err: err.toString(),
                })
            }
        }

        progress.succeed(
            `(${parseInt(currentCategory) + 1}) ${category.slug}` +
                ` completed: ${totalCount}/${totalCount} projects`,
        )
    }

    const databaseLocation = path.resolve(__dirname, '../database.sqlite')
    const progress = ora('Creating database...').start()

    const db = new sequelize.Sequelize({
        dialect: 'sqlite',
        storage: databaseLocation,
        logging: false,
    })

    const Category = db.define('category', {
        name: sequelize.TEXT,
        slug: sequelize.TEXT,
    })

    const Subcategory = db.define('subcategory', {
        name: sequelize.TEXT,
        slug: sequelize.TEXT,
        categoryId: {
            type: sequelize.INTEGER,
            references: {
                model: Category,
                key: 'id',
            },
        },
    })

    const Project = db.define('project', {
        name: sequelize.TEXT,
        description: sequelize.TEXT,
        githubURL: sequelize.TEXT,
        altURLs: sequelize.TEXT,
        githubStars: sequelize.INTEGER,
        githubLastUpdate: sequelize.DATEONLY,
        githubLastPush: sequelize.DATEONLY,
        npmDownloadsThisMonth: sequelize.INTEGER,
        categoryId: {
            type: sequelize.INTEGER,
            references: {
                model: Subcategory,
                key: 'id',
            },
        },
    })

    // Create new tables
    await db.sync({ force: true })

    for (let category of final) {
        Category.create(category)
        Category.sync()
        const { id: categoryId } = await Category.findOne({
            where: { slug: category.slug },
            attributes: ['id'],
        })
        for (let subcategory of category.subcategories) {
            Subcategory.create({ ...subcategory, categoryId })
            Subcategory.sync()
            const { id: subcategoryId } = await Subcategory.findOne({
                where: { slug: subcategory.slug },
                attributes: ['id'],
            })
            for (let project of subcategory.repositories) {
                const altURLs =
                    typeof project.altURLs === 'string'
                        ? project.altURLs
                        : project.altURLs.join(';;;')
                await Project.create({ ...project, altURLs, subcategoryId })
            }
            Project.sync()
        }
    }

    if (fs.existsSync(errorsLocation)) fs.truncateSync(errorsLocation)
    fs.writeFileSync(errorsLocation, JSON.stringify({ parsingErrors, asyncErrors }, null, 2))

    db.sync()
    progress.succeed(`Data saved to file "${databaseLocation}"`)
    console.log(`Saved data to file: ${databaseLocation}`)
}
