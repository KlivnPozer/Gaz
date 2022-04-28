const { references } = require("./index");
const { DataTypes } = require("sequelize");

module.exports = global.database.define(
    references.accounts,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
      
        login: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },

        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        isRoot: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }
);