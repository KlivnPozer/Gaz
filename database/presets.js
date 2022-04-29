require("./connect");

const bcrypt = require("bcrypt");
const AccountModel = require("../models/account");
const DateMoodel = require("../models/date");
const EventMemberModel = require("../models/eventMember");
const accountData = {
    login: "root",
    passwordHash: bcrypt.hashSync("rootroot",2),
    isRoot: true
};
const date = new Date();
const data = {
    month: date.getMonth,
    day:date.getDay,
    year: date.getFullYear
};
const event = {
    name:"Скрынников Максим Алексеевич"
};

const process = async () => {

    if (!(await AccountModel.findOne({login: "root"}))) {
        console.log("Default root account added!");
        await AccountModel.create(accountData);
        
    }
    if(!(await DateMoodel.findOne({day:"10"}))){
        console.log("data added");
        await DateMoodel.create(data);
    }
    if(!(await EventMemberModel.findOne({id:0}))){
        console.log("member added");
        await EventMemberModel.create(event);
    }

}

process();