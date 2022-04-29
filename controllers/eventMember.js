const EventMemberModel = require("../models/eventMember")
class Member{
async create(req,res){
        const {
            name
        } = req.body;

        let foundEventMember;
        let crearedEventMember;
        if(foundEventMember = await EventMemberModel.findOne({name:name})){
            return res.status("404").json({message: "Член собрания уже создан"}).end();
        }
        if(!(crearedEventMember = this.EventMemberModel.create(name))){
            return res.status("404").json({massage:"Ошибка создания члена собрания"})
        }
        return res.status("200")
    }
}
module.exports = new Member();