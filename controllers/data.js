const DataModel = require("../models/date")
class Data{
async create(req,res){
        const {
            day,
            year,
            month
        } = req.body;

        let foundData;
        let crearedData;
        if(foundData = await DataModel.findOne({day, year, month})){
            return res.status("404").json({message: "Дата уже создана"}).end();
        }
        if(!(crearedData = this.DataModel.create({day, year, month}))){
            return res.status("404").json({massage:"Ошибка создания даты"})
        }
        return res.status("200")
    }
}
module.exports = new Data();