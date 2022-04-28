const { references } = require("./index");
const { DataTypes } = require("sequelize");

module.exports = global.database.define(
    references.days,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        monthId: {
            type: DataTypes.INTEGER,
            references: references.months,
            referencesKey: "id"
        },
      
        name: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },
    }
);