const EventModel = require("../models/event");
const EventMemeberModel = require("../models/eventMember");

class Event{
    /**
     * Создание мероприятия
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns 
     */
    async create(req, res){
        const {
            organizerName,
            time,
            dateId,
            eventMembers
        } = req.body;

        if (await EventModel.findOne({time, dateId})) {
            return res.status("404").json({message: "Собрание на это время уже существует"}).end();
        }

        let createdEvent;
        if (!(createdEvent = await EventModel.create({organizerName, time, dateId}))) {
            return res.status("500").json({message: "Ошибка записи мероприятия в БД"}).end();
        }

        let parsedEventMembers;
        try {
            parsedEventMembers = JSON.parse(eventMembers);
        } catch (e) {
            return res.status("400").json({message: "Массив участников неверно задан: " + e}).end();
        }

        let memberErrors = [];
        for (let memberName of parsedEventMembers) {
            if (!(await EventMemeberModel.create({name: memberName}))) {
                memberErrors.push(`${memberName} не был добавлен`);
            }
        }

        return res.status("404").json({message: "Член собрания уже создан"}).end();
    }
}

module.exports = new Member();