require("./connect");

const bcrypt = require("bcrypt");
const AccountModel = require("../models/account");
const DateModel = require("../models/date");
const EventMemberModel = require("../models/eventMember");
const accountData = {
    login: "root",
    passwordHash: bcrypt.hashSync("rootroot",2),
    isRoot: true
};
const date = new Date();

const event = {
    name: "Скрынников Максим Алексеевич"
};

const process = async () => {

    if (!(await AccountModel.findOne({login: "root"}))) {
        await AccountModel.create(accountData);
        console.log("Default root account added!");
    }
    // if(!(await DateMoodel.findOne({day:"10"}))){
    //     await DateMoodel.create(data);
    //     console.log("data added");
    // }
    // if(!(await EventMemberModel.findOne({id:0}))){
    //     await EventMemberModel.create(event);
    //     console.log("member added");
    // }

    const year = date.getFullYear();

    if (!(await DateModel.findOne({year}))) {
        for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
            let daysLength = 28;
            switch (monthIndex) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    daysLength = 31;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    daysLength = 30;
                    break;
            }
 
            for (let dayIndex = 1; dayIndex <= daysLength; dayIndex++) {
                await DateModel.create({year, month: monthIndex, day: dayIndex});
                console.log(`CREATED DATE: ${JSON.stringify({year, month: monthIndex, day: dayIndex})}`);
            }
        }
    }
}

try {
    process();
} catch (e) {
    console.log(e);
}