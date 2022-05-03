const { references } = require("./index");
const { DataTypes } = require("sequelize");


module.exports = global.database.define(
    references.event,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        organizerName:{
            type: DataTypes.STRING,
            trim: true,
            allowNull: false 
        },
        dateId: {
            type: DataTypes.INTEGER,
            references: {
                model: references.date,
                key: "id"
            },
            allowNull: false 
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false 
        }
    }
)