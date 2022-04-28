const { references } = require("./index");
const { DataTypes } = require("sequelize");

module.exports = global.database.define(
    references.eventMembers,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        eventId: {
            type: DataTypes.INTEGER,
            references: references.events,
            referencesKey: "id"
        },
      
        name: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },
    }
);