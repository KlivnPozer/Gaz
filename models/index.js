module.exports = {
    references: {
        accounts: "accounts",
        years: "years",
        months: "months",
        days: "days",
        events: "events",
        eventMembers: "eventMembers"
    },

    load: () => {
        const AccountModel = require("./account");
        const EventModel = require("./event");
        const EventMemberModel = require("./eventMember");
        const DayModel = require("./days");
        const MonthModel = require("./month");
        const YearModel = require("./year");

        YearModel.hasMany(MonthModel, {foreignKey: "yearId", as: "year"});
        MonthModel.hasMany(DayModel, {foreignKey: "monthId", as: "month"});
        DayModel.hasMany(EventModel, {foreignKey: "dayId", as: "day"});
        EventModel.hasMany(EventMemberModel, {foreignKey: "eventId", as: "event"});

    }
}