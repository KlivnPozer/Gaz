const { references } = require("./index");
const { DataTypes } = require("sequelize");

module.exports = global.database.define(
    references.months,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        yearId: {
            type: DataTypes.INTEGER,
            references: references.years,
            referencesKey: "id"
        },
      
        name: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },
    }
);