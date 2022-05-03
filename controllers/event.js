const ExcelUtils = require("../utils/excel");

const DateModel = require("../models/date");
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

        if (await EventModel.findOne({where: {time, dateId}})) {
            return res.status(404).json({message: "Собрание на это время уже существует"}).end();
        }

        let createdEvent;
        if (!(createdEvent = await EventModel.create({organizerName, time, dateId}))) {
            return res.status(500).json({message: "Ошибка записи мероприятия в БД"}).end();
        }

        let memberErrors = [];
        for (let memberName of eventMembers) {
            if (!(await EventMemeberModel.create({name: memberName, eventId: createdEvent.id}))) {
                memberErrors.push(`${memberName} не был добавлен`);
            }
        }

        if (memberErrors.length > 0) {
            return res.status(500).json({messages: memberErrors}).end();
        }

        return res.status(500).json({
            eventId: createdEvent.id
        }).end();
    }

    /**
     * Импорт excel таблицы
     * с множеством мероприятий
     * 
     * @param {object} req 
     * @param {object} res 
     */
    async importTable (req, res) {
        const parsedTable = await ExcelUtils.parseFromExcel(req.file.buffer);

        let errors = [];
        let eventIds = [];
        for (let event of parsedTable) {
            const [
                day,
                month,
                year
            ] = event.full_date.split(".");
            
            let foundDate;
            if (!(foundDate = await DateModel.findOne({where: {year, month, day}}))) {
                foundDate = await DateModel.create({year, month, day});
            }

            const parsedTime = new Date(event.time);
            const time = `${parsedTime.getHours()-4}:00`
            const dateId = foundDate.id;
            if (await EventModel.findOne({where: {time, dateId}})) {
                errors.push(`Мероприятие на ${event.full_date} ${event.time} уже существует`);
                continue;
            }
            
            const organizerName = event.organizerName;
            let createdEvent;
            if (!(createdEvent = await EventModel.create({organizerName, time, dateId}))) {
                errors.push(`Критическая ошибка при создании мероприятия на ${event.full_date} ${event.time}`);
                continue;
            } else {
                eventIds.push(createdEvent.id);
            }
    
            if (Array.isArray(event.eventMembers)) {
                for (let memberName of event.eventMembers) {
                    if (!(await EventMemeberModel.create({name: memberName, eventId: createdEvent.id}))) {
                        errors.push(`${memberName} не был добавлен`);
                    }
                }
            } else {
                if (!(await EventMemeberModel.create({name: event.eventMembers, eventId: createdEvent.id}))) {
                    errors.push(`${memberName} не был добавлен`);
                }
            }
        }

        if (errors.length > 0) {
            return res.status(500).json({errors}).end();
        }

        return res.status(200).json({eventIds, errors}).end();
    }
}

module.exports = new Event();