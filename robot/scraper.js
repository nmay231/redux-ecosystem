/** @format */

const fetch = require('isomorphic-fetch')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

const { get: getNPMStats } = require('download-stats')
const { parse: parseMarkdown } = require('remark')

const { githubAPIKey } = require('../utils/consts')
const databaseLocation = path.resolve(__dirname, '../public/database.json')
const errorsLocation = path.resolve(__dirname, 'errors.json')
const repoLocation = path.resolve(__dirname, 'links')
const fileBlacklist = { '.git': '', '.github': '', 'README.md': '' }

const slugify = (str) => str.toLowerCase().replace(/( ?- ?)|\/| /g, '-')
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
const errors = []

for (let fileName of fs.readdirSync(repoLocation)) {
    if (fileName in fileBlacklist) continue
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
                errors.push({
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
                errors.push({
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
                errors.push({
                    fileName,
                    subcategoryName: subcategory.name,
                    message: 'Warning: skipping list in category because not a list of repos',
                })
                if (category.subcategories.length) category.subcategories.pop()
                continue
            }

            // Check for single header files (with no subcategories) like routing.md
            if (!subcategory.name) {
                errors.push({
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
                // if (repository.name === 'redux-thunk')
                //     console.log(JSON.stringify(paragraph, null, 4))
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
    `Parsed files with ${errors.length} warnings.
    Found ${totalCount} total repositories/projects.`,
)

// I do this because I don't like IIFEs
main()

async function main() {
    const asyncErrors = []
    const catCount = final.length
    for (let currentCategory in final) {
        const category = final[currentCategory]

        let completed = 0
        const totalCount = category.subcategories.reduce(
            (subCount, sub) => subCount + sub.repositories.length,
            0,
        )

        const progress = ora('').start()
        const updateProgress = (currentRepo) => {
            progress.text =
                `${category.slug}(${currentCategory + 1}/${catCount}): ` +
                `${completed}/${totalCount} ${currentRepo}`
        }
        updateProgress('Starting category...')

        /* prettier-ignore */
        await Promise.all(category.subcategories.map((subcat) => new Promise(async (resolve) => {
            await Promise.all(subcat.repositories.map((repo) => new Promise(async (resolve) => {
                try {
                    if (repo.githubURL) {
                        const [https, _, githubDotCom, repoOwner, repoName, ...stuff] = repo.githubURL.split('/')
                        const githubRepoURL = `https://api.github.com/repos/${repoOwner}/${repoName}`
    
                        const githubData = await fetchJSON(githubRepoURL)
                        repo.githubStars = githubData.stargazers_count
                        repo.githubLastUpdate = githubData.updated_at.split('T')[0]
                        repo.githubLastPush = githubData.pushed_at.split('T')[0]
                        repo.isArchived = githubData.archived
    
                        repo.npmDownloadsThisMonth = await new Promise((resolve) => {
                            getNPMStats.lastMonth(repoName, (err, results) =>
                                resolve(err ? 0 : results.downloads)
                            )
                        })
    
                        updateProgress(repoName)
                        completed++
                    }
                } catch (err) {
                    asyncErrors.push({
                        githubURL: repo.githubURL,
                        err
                    })
                }
                resolve()
            })))
            resolve()
        })))

        progress.succeed(`Completed ${category.slug}: ${totalCount}/${totalCount}`)
    }

    if (fs.existsSync(databaseLocation)) fs.truncateSync(databaseLocation, 0)
    fs.writeFileSync(
        databaseLocation,
        JSON.stringify({ categories: final, last_updated: Date() }, null, 2),
    )

    if (fs.existsSync(errorsLocation)) fs.truncateSync(errorsLocation, 0)
    fs.writeFileSync(errorsLocation, JSON.stringify({ errors, asyncErrors }, null, 2))
    console.log(`Saved data to file: ${databaseLocation}`)
}
