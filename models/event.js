const { references } = require("./index");
const { DataTypes } = require("sequelize");

module.exports = global.database.define(
    references.events,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        dayId: {
            type: DataTypes.INTEGER,
            references: references.days,
            referencesKey: "id"
        },
      
        nameOrganizer: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },

        time: {
            type: DataTypes.TIME,
            default: Date.now()
        },
    }
);