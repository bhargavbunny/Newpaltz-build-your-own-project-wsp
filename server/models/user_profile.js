const conn = require('./mysql_connection');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM 2019user_profile");   
    },
    async addprofile(input){
        const data = await conn.query(
            "INSERT INTO 2019user_profile (FirstName,LastName,Birthday,height,weight,job) VALUES (?)",
            [[input.FirstName, input.LastName, input.Birthday, input.height,input.weight,input.job]]
        );
        return await model.get(data.insertId);
    },
    async updateprofile(input){
        const data = await conn.query(
            "INSERT INTO 2019user_profile (FirstName,LastName,Birthday,height,weight,job) VALUES (?)",
            [[input.FirstName, input.LastName, input.Birthday, input.height,input.weight,input.job]]
        );
        return await model.get(data.insertId);
    }

};

module.exports = model;