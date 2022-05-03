const EventModel = require("../models/event");
const EventMemberModel = require("../models/eventMember");

class EventMember {
    /**
     * Добавление участников
     * в мероприятия
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns 
     */
    async add (req, res){
        const {
            eventId,
            name
        } = req.body;

        let foundEvent;
        if (!(foundEvent = await EventModel.findOne({where: {id: eventId}}))) {
            return res.status(404).json({message: "Указанное мероприятие не найдено"}).end();
        }

        if (await EventMemberModel.findOne({where: {eventId: foundEvent.id, name}})) {
            return res.status(400).json({message: "Указанный участник уже присутствует в мероприятии"}).end();
        }

        let createdEventMember;
        if (!(createdEventMember = await EventMemberModel.create({eventId: foundEvent.id, name}))) {
            return res.status(400).json({message: "Неизвестная ошибка БД при добавлении участника"}).end();
        }

        return res.status(200).json({eventMemberId: createdEventMember.id}).end();
    }

    /**
     * Изменение участника
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns 
     */
    async update (req, res) {
        const {
            eventMemberId,
            name
        } = req.body;

        let foundEventMember;
        if (!(foundEventMember = await EventMemberModel.findOne({where: {id: eventMemberId}}))) {
            return res.status(404).json({message: "Указанный участник не найден"}).end();
        }

        if (await EventMemberModel.findOne({where: {eventId: foundEventMember.eventId, name}})) {
            return res.status(400).json({message: "Указанный участник уже присутствует в мероприятии"}).end();
        }

        if (name === foundEventMember.name) {
            return res.status(400).json({message: "Имя не изменилось"}).end();
        }

        if (!(await foundEventMember.update({name}))) {
            return res.status(500).json({message: "Ошибка записи изменений в БД"}).end();
        }

        return res.status(200).json().end();
    }

    /**
     * Удаление участника
     * 
     * @param {object} req 
     * @param {object} res
     * @returns 
     */
    async remove (req, res) {
        const {
            eventMemberId
        } = req.query;

        let foundEventMember;
        if (!(foundEventMember = await EventMemberModel.findOne({where: {id: eventMemberId}}))) {
            return res.status(404).json({message: "Указанный участник не найден"}).end();
        }

        if (!(await foundEventMember.destroy())) {
            return res.status(404).json({message: "Неизвестная ошибка удаления из БД"}).end();
        }

        return res.status(200).json().end();
    }
}

module.exports = new EventMember();