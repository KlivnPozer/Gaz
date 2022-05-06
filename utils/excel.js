const ExcelJS = require('exceljs');
const { is } = require('express/lib/request');

/**
 * Экспортируем функции по работе с Excel
 */
module.exports = {
    /**
     * Парсинг эксель-таблицы
     * @param {string} buffer
     * @returns
     */
    parseFromExcel: async (buffer) => {
        // Создаём новый экземпляр книги
        const workbook = new ExcelJS.Workbook();
        // Считываем файл в созданную книгу
        await workbook.xlsx.load(buffer);

        // Создаём JSON массив для записи в него спаршеной таблицы
        let jsonData = [];
        
        // Перебираем все листы таблицы
        workbook.worksheets.forEach(function(sheet) {
            // Считываем 2-ю строку(с кодовыми значениями)
            let keysRow = sheet.getRow(2);
            // Если она не содержит ячеек - выход
            if (!keysRow.cellCount) return;
            // Если содержит ячейки - записываем их значения
            let keys = keysRow.values;
            // Перебираем все строки
            sheet.eachRow((row, rowNumber) => {
                // Если строка относится к техническим - идём дальше
                if (rowNumber < 3) return;
                // Если нет - записываем её значния в массив
                let values = row.values;
                // Создаём объект строки
                let obj = {};
                // Перебираем столбцы строки
                for (let i = 1; i < values.length; i ++) {
                    // Выбираем ключ столбца (если значений больше, чем ключей, последний ключ является ключом массива)
                    const key = keys[i] ?? keys[keys.length-1];

                    // Если значение с таким ключём уже есть - конвертируем её в массив
                    if (obj[key]) {
                        // Если получаемый объект не является массивом - конвертируем в него
                        if (!Array.isArray(obj[key])) {
                            // Создаём массив, записываем значения
                            const array = [];
                            array.push(obj[key]);
                            array.push(values[i]);
                            // Записываем в конечный объект
                            obj[key] = array;
                        } else {
                            // Если это уже массив - записываем в него
                            obj[key].push(values[i]);
                        }
                    } else {
                        // Если данный ключ отсутсвует в объекте - записываем в него
                        obj[key] = values[i];
                    }      

                }
                // Записываем объект в массив
                jsonData.push(obj);
            });
        });
        
        return jsonData;
    },
    /**
     * Конвертация массива строк в эксель-таблицу
     * @param {Array} data 
     * @param {string} path 
     */
    convertToExcel: async (data, path) => {
        // Cоздание таблицы
        const workbook = new ExcelJS.Workbook();
        // Создание листа
        const worksheet = workbook.addWorksheet("Event");
        // Задание параметров столбцов
        worksheet.columns = [
            {
                header: "Дата",
                key: "date"
            },
            {
                header: "Время",
                key: "time"
            },
            {
                header: "ФИО организатора",
                key: "organizerName"
            },
            {
                header: "ФИО участников",
                key: "eventMembers"
            }
        ];
        // Массив основных параметров
        const arrayRow = [
            `${data.date.day}.${data.date.month}.${data.date.year}`, 
            data.time, 
            data.organizerName
        ];
        // Добавление участников мероприятия
        console.log(data);
        for (let member of data.eventMembers) {
            arrayRow.push(member.name);
        }
        // Добавление основных параметров
        worksheet.addRow(
            arrayRow
        );
        
        // Сохранение получившейся таблицы
        try {
            await workbook.xlsx.writeFile(path);
            return true;
        } catch (e) {
            console.log("Error converting table: " + e);
            return false;
        }
    }
}