const DateModel = require("../models/date");

module.exports = {
    /**
     * Генерировать даты по году
     * @param {Number} yearNumber 
     */
    generateByYear: async (yearNumber) => {
        console.log(`Начинаем записывать даты ${yearNumber} года:`);

        // Перебираем все 12 месяцев
        for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
            const daysLength = new Date(yearNumber, monthNumber, 0).getDate();

            let daysSuccessWrote = 0;
            // Перебираем все дни месяца
            for (let dayNumber = 1; dayNumber <= daysLength; dayNumber++) {
                // Записываем дату в базу данных
                if (await DateModel.create({year: yearNumber, month: monthNumber, day: dayNumber})) {
                    daysSuccessWrote++;
                }
            }
            console.log(`В ${monthNumber} успешно записано ${daysSuccessWrote} дней (из ${daysLength})`);
        }
    }
}