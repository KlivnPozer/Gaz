var mammoth = require("mammoth");

/**
 * Word-парсер
 */
module.exports = {
    parse: async function (buffer) {
        const data = (await mammoth.extractRawText({buffer})).value;

        const dateRegex = /дата\s\S(\d+)\S\s([а-яА-ЯЁё]+)\s(\d+)/gimu;
        const timeRegex = /время\sс\s(\d+:\d+)/gimu;
        const membersRegex = /([а-яА-ЯЁё]+\s\W\.\W\.)/gimu
        const organizerNameRegex = /ответственный\sза\sорганизацию\sсовещания:\n\n\d\.\s([а-яА-ЯЁё\s]+)\n/gimu

        // Парсинг даты
        const parsedDate = dateRegex.exec(data);
        const monthVarior = {"января": 1, "февраля": 2, "марта": 3, "апреля": 4, "мая": 5, "июня": 6, "июля": 7, "августа": 8, "сентября": 9, "октября": 10, "ноября": 11, "декабря": 12};
        const formatedDate = `${parsedDate[1]}.${monthVarior[parsedDate[2]]}.${parsedDate[3]}`;
        
        // Парсинг времени 
        const parsedTime = timeRegex.exec(data)[1];

        // Парсинг участников
        const membersList = [];
        do {
            m = membersRegex.exec(data);
            if (m) {
                membersList.push(m[1]);
            }
        } while (m);

        // Парсинг организатора
        const organizerName = organizerNameRegex.exec(data)[1];

        return [
            {
                full_date: formatedDate,
                time: parsedTime,
                eventMembers: membersList,
                organizerName
            }
        ]
    }
}