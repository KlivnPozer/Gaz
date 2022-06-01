const connection = require("./connect");

const { loadRelations } = require("../models/index");
const bcrypt = require("bcrypt");

const DateUtils = require("../utils/date");

const accountData = {
    login: "root",
    passwordHash: bcrypt.hashSync("rootroot",2),
    isRoot: true
};

const date = new Date();

const process = async () => {
    loadRelations();

    const AccountModel = require("../models/account");  

    /**
     * Создание управляющего аккаунта
     */
    if (!(await AccountModel.findOne({where: {login: "root"}}))) {
        await AccountModel.create(accountData);
        console.log("Управляющий аккаунт был создан!");
    }

    /**
     * Создание текущего календарного года, месяцев, дней
     */
    await DateUtils.generateByYear(date.getFullYear());

    console.log("Database synced");
}

try {
    // Подключение моделей
    require("../models").loadModels();
    // Синхронизация БД
    connection.sync({force: true}).then(
       process
    )
} catch (e) {
    console.log(e);
}