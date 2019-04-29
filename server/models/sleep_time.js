const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM 2019user_sleeptime");   
    },
    async addsleep(input){
        const data = await conn.query(
            "INSERT INTO 2019user_sleeptime (sleept_time) VALUES (?)",
            [[input.sleep_time]]
        );
        return await model.get(data.insertId);
    },
    async updatesleep(input){
        const data = await conn.query(
            "INSERT INTO 2019user_sleeptime (sleept_time) VALUES (?)",
            [[input.sleep_time]]
        );
        return await model.get(data.insertId);
    }

};

module.exports = model;