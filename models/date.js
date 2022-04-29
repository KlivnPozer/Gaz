const { references } = require("./index");
const { DataTypes } = require("sequelize");


module.exports = global.database.define(
    references.data,
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