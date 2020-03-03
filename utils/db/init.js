/** @format */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Sequelize = require('sequelize')

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
        name: sequelize.TEXT,
        description: sequelize.TEXT,
        githubURL: sequelize.TEXT,
        altURLs: sequelize.TEXT,
        githubStars: sequelize.INTEGER,
        githubLastRelease: sequelize.DATEONLY,
        githubLastPush: sequelize.DATEONLY,
        githubIsArchived: sequelize.BOOLEAN,
        npmDownloadsThisMonth: sequelize.INTEGER,
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
