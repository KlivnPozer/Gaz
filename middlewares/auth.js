const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account");

/**
 * Промежуточная функция
 * проверки авторизационного токена
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {Function} next 
 */
module.exports = async (req, res, next) => {
    // Проверяем наличие токена
    if (!req.headers.authorization) {
        return res.status(400).json({message: "Авторизационный токен отсутсвует"}).end();
    }

    // Записываем токен в константу
    const token = req.headers.authorization;

    // Декодируем токен (чтобы достать данные из неё)
    let decodedToken;
    try {
        decodedToken = jwt.decode(token);
    } catch (e) {
        return res.status(403).json({message: "Авторизационный токен недействителен"}).end();
    }

    // Получение аккаунта
    let foundAccount;
    try {
        if (!(foundAccount = await AccountModel.findOne(decodedToken.accountId))) {
            return res.status(403).json({message: "Ваш аккаунт был заблокирован или удалён"}).end();
        }
    } catch (e) {
        return res.status(500).json({message: "Неизвестная ошибка проверки токена: " + e}).end();
    }

    // Записываем найденный аккаунт (привязанный к токену) в запрос для дальнейшего использования
    req.account = foundAccount;

    // Успех
    next ();
}