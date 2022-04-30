const { references } = require("./index");
const { DataTypes } = require("sequelize");


module.exports = global.database.define(
    references.event,
    {
        organaizerName:{
            type: DataTypes.STRING,
            trim: true,
            allowNull: false 
        },
        dateEvent: {
            type: DataTypes.INTEGER,
            references: references.date,
            referencesKey: "id"
        },
        time: {
            type: DataTypes.TIME,
            default: DataTypes.NOW
        }
    }
)