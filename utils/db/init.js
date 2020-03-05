/** @format */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Sequelize = require('sequelize')
const { urlListSeparator } = require('../consts')

const sequelize = new Sequelize.Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    // eslint-disable-next-line no-undef
    logging: process.env.NODE_ENV === 'development' && console.log,
})

class Category extends Sequelize.Model {}
Category.init(
    {
        name: Sequelize.TEXT,
        slug: Sequelize.TEXT,
    },
    {
        sequelize,
        modelName: 'category',
    },
)

class Subcategory extends Sequelize.Model {}
Subcategory.init(
    {
        name: Sequelize.TEXT,
        slug: Sequelize.TEXT,
    },
    {
        sequelize,
        modelName: 'subcategory',
    },
)
Category.hasMany(Subcategory)
Subcategory.belongsTo(Category)

class Project extends Sequelize.Model {}
Project.init(
    {
        name: Sequelize.TEXT,
        description: Sequelize.TEXT,
        githubURL: Sequelize.TEXT,
        githubStars: Sequelize.INTEGER,
        githubLastRelease: Sequelize.DATEONLY,
        githubLastPush: Sequelize.DATEONLY,
        githubIsArchived: Sequelize.BOOLEAN,
        npmDownloadsThisMonth: Sequelize.INTEGER,
        altURLs: {
            type: Sequelize.TEXT,
            get() {
                const urls = this.getDataValue('altURLs')
                return urls ? urls.split(urlListSeparator) : []
            },
        },
    },
    {
        sequelize,
        modelName: 'project',
    },
)
Category.hasMany(Project)
Subcategory.hasMany(Project)
Project.belongsTo(Subcategory)
Project.belongsTo(Category)

module.exports = {
    db: sequelize,
    Category,
    Subcategory,
    Project,
}
