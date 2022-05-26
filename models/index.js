module.exports = {
    references: {
        accounts: "accounts",
        date: "dates",
        event: "events",
        eventMembers: "eventMembers"
    },
    loadModels: () => {
        require("./account");
        require("./date");
        require("./event");
        require("./eventMember");
    },
    loadRelations: () => {
        const DateModel = require("./date");
        const EventModel = require("./event");
        const EventMemberModel = require("./eventMember");

        EventModel.belongsTo(DateModel, {
            foreignKey: "dateId",
            as: "date"
        });

        EventMemberModel.belongsTo(EventModel, {
            foreignKey: "eventId",
            as: "event"
        })
    }
}