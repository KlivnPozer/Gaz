const { references } = require("./index");
const { DataTypes } = require("sequelize");


module.exports = global.database.define(
    references.event,{
    organaizer_name:{
        type: DataTypes.STRING,
        trim: true,
        allowNull: false 
    },
    eventMemberId: {
        type: DataTypes.INTEGER,
        references: references.eventMembers,
        referencesKey: "id"
    },
    dataEvent: {
        type: DataTypes.INTEGER,
        references: references.data,
        referencesKey: "id"
    },
})