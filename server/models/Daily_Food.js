const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Daily_Food");   
    },
    async getDailyFoods(id){
        const data = await conn.query("SELECT * FROM Fitness_Daily_Foods WHERE Id=?", id);
        if(!data){
            throw Error("Not found");
        }
        return data[0];
    },
    async getID(input) {
        const data = await conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE name=?", input.name);
        if(!data) {
            throw Error('Food not added.')
        }
        return data;
    },
    async add(email, input){
        const data = await conn.query(
            `INSERT INTO Fitness_Daily_Foods F Join Fitness_Users_Daily_Foods UF On F.ID = UF.DAILY_FOODS_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            (date,calorie_total,daily_foods,date_created,date_updated) WHERE U.VALUE=`, email, 
            [[input.date, input.calorie_total, input.daily_foods, input.date_created, new Date()]]
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateDailyFoods(email, date){
        const data = await conn.query(
            `Update Fitness_Daily_Foods F Join Fitness_Users_Daily_Foods UF On F.ID = UF.DAILY_FOODS_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and W.VALUE=`, email, date);
        if(data.length == 0){
            throw Error('Log for this Date Not Found')
        }else{
        return { status: "success", message: "Daily Food Log Entry Succesfully Updated" };
        }
    },  
    async deleteDailyFoods(email, date){
        const data = await conn.query(
            `DELETE * FROM Fitness_Daily_Foods F Join Fitness_Users_Daily_Foods UF On F.ID = UF.DAILY_FOODS_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            WHERE U.VALUE= and W.VALUE=`, email, date);
        if(data.length == 0){
            throw Error('Log for this Date Not Found')
        }else{
        return { status: "success", message: "Daily Food Log Entry Succesfully Deleted" };
        }
    }, 
    async addFoodItems(email, date, input){
        const data = await conn.query(
            `INSERT INTO Fitness_Daily_Foods F Join Fitness_Users_Daily_Foods UF On F.ID = UF.DAILY_FOODS_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            (daily_foods,date_updated) WHERE U.VALUE= AND R.VALUE=`, email, date, 
            [[input.daily_foods, new Date()]]
        );
    },
    async deleteFoodItems(email, date){
        const data = await conn.query(
            `DELETE Fitness_Daily_Foods F Join Fitness_Users_Daily_Foods UF On F.ID = UF.DAILY_FOODS_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            WHERE U.VALUE= and R.VALUE=`, email, date);
        if(data.length == 0){
            throw Error('Daily Log Not Found')
        }else{
        return { status: "success", message: "Daily Food Log Entry Succesfully Deleted" };
        }
    }, 
}; 

module.exports = model;
