require("./connect");

const bcrypt = require("bcrypt");
const AccountModel = require("../models/account");
const YearModel = require("../models/year");
const MonthModel = require("../models/month");

const accountData = {
    login: "root",
    passwordHash: bcrypt.hashSync("rootroot",2),
    isRoot: true
}

const process = async () => {

    if (!(await AccountModel.findOne({login: "root"}))) {
        console.log("Default root account added!");
        await AccountModel.create(accountData);
    }

    const date = new Date();
    // Вставляем текущий год, ёпт
    if (!(await YearModel.findOne({name: date.getFullYear()}))) {
        const year = YearModel

        for (let monthIndex = 0; monthIndex < 12; monthIndex ++) {

        }
    }

}

process();