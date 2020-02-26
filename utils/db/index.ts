/** @format */

import sequelize, { Sequelize } from 'sequelize'

export const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: process.env.NODE_ENV === 'development' && console.log,
})

export const Category = db.define('category', {
    name: sequelize.TEXT,
    slug: sequelize.TEXT,
})

export const Subcategory = db.define('subcategory', {
    name: sequelize.TEXT,
    slug: sequelize.TEXT,
})
Category.hasMany(Subcategory)
Subcategory.belongsTo(Category)

export const Project = db.define('project', {
    name: sequelize.TEXT,
    description: sequelize.TEXT,
    githubURL: sequelize.TEXT,
    altURLs: sequelize.TEXT,
    githubStars: sequelize.INTEGER,
    githubLastRelease: sequelize.DATEONLY,
    githubLastPush: sequelize.DATEONLY,
    githubIsArchived: sequelize.BOOLEAN,
    npmDownloadsThisMonth: sequelize.INTEGER,
})
Category.hasMany(Project)
Subcategory.hasMany(Project)
Project.belongsTo(Subcategory)
Project.belongsTo(Category)
