const database = require("../database/connect");
const { references } = require("./index");
const { DataTypes } = require("sequelize");

module.exports = database.define(
    references.date,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        month:{
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },
        day:{
            type: DataTypes.STRING,
            trim: true,
            allowNull: false  
        },
        year:{
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        }
    }
);