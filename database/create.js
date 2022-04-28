const sqlite3 = require('sqlite3').verbose()
const Sqlizze = require('sqlizze')

try{
    const sqlize = new Sqlizze('./test.db', sqlite3)
    const sqlize = require("../database/connect/sqlize")
    const bcrypt = require("bcrypt");
}catch(e){
    console.log(e)
}

