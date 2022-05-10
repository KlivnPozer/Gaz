const { Op } = require("sequelize");
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

    /**
     * Экспорт указанного мероприятия
     * в таблицу xlsx
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns 
     */
    async exportTable (req, res) {
        const {
            eventId
        } = req.query;

        let foundEvent;
        if (!(foundEvent = await EventModel.findOne({where: {id: eventId}}))) {
            return res.status(404).json({message: "Мероприятие не найдено"}).end();
        }

        let foundDate;
        if (!(foundDate = await DateModel.findOne({where: {id: foundEvent.dateId}}))) {
            return res.status(404).json({message: "Дата мероприятия не найдена"}).end();
        }

        let foundEventMembers;
        if (!(foundEventMembers = await EventMemeberModel.findAll({where: {eventId: foundEvent.id}}))) {
            return res.status(404).json({message: "Участники мероприятия не найдены"}).end();
        }

        foundEvent.date = foundDate;
        foundEvent.eventMembers = foundEventMembers;

        const pathConvertedEvent = `${require("os").tmpdir()}/${Date.now()}_converted.xlsx`;
        await ExcelUtils.convertToExcel(foundEvent, pathConvertedEvent);

        return res.sendFile(pathConvertedEvent);
    }

    /**
     * Получить мероприятия указанного
     * месяца
     * 
     * @param {object} req 
     * @param {object} res 
     */
    async getMonthEvents (req, res) {
        const {
            month,
            year
        } = req.query;

        let foundDates;
        if (!(foundDates = await DateModel.findAll({
            where: {month, year}
        }))) {
            return res.status(404).json({message: "Месяц не найден"}).end();
        }

        const monthEvents = [];
        for (let date of foundDates) {
            let dateData = [
                {
                    time: "9:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "10:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "11:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "12:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "13:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "14:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "15:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "16:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                },
                {
                    time: "17:00",
                    date: `${date.day}.${date.month}.${date.year}`,
                    busy: false
                }
            ];

            for (let time = 9; time < 18; time++) {
                let foundEvent; 
                if (!(foundEvent = await EventModel.findOne({where: {dateId: date.id, time: `${time}:00`}}))) {
                    continue;
                }

                let timeIndex = time-9;
                dateData[timeIndex] = Object.assign(dateData[timeIndex], {
                    busy: true,
                    organizerName: foundEvent.organizerName,
                    eventMembers: await EventMemeberModel.findAll({where: {eventId: foundEvent.id}}) ?? [],
                    eventId: foundEvent.id
                });
            }

            monthEvents.push(dateData);
        }

        return res.status(200).json({monthEvents}).end();
    }

    /**
     * Обновить информацию о мероприятии
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns
     */
    async update (req, res) {
        const { 
            eventId,
            organizerName 
        } = req.body;

        let foundEvent;
        if (!(foundEvent = await EventModel.findOne({where: {id: eventId}}))) {
            return res.status(404).json({message: "Мероприятие не найдено"}).end();
        }

        if (!(await foundEvent.update({organizerName}))) {
            return res.status(500).json({message: "Неизвестная ошибка обновления мероприятия"}).end();
        }

        return res.status(200).json({message: "ok"}).end();
    }
}

module.exports = new Event();