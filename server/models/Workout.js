const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM tbl_slept_time");   
    },
    async getWorkout(id){
        const data = await conn.query("SELECT * FROM tbl_slept_time WHERE Id=?", id);
        if(!data){
            throw Error("Workout not found");
        }
        return data[0];
    },
    async getID(input) {
        const data = await conn.query("SELECT ID FROM tbl_slept_time WHERE name=?", input.name);
        if(!data) {
            throw Error('Workout not added.')
        }
        return data;
    },
    async addWorkout(input){
        const data = await conn.query(`'INSERT into tbl_slept_time,,` 
            [[ input.time]]
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateWorkout(email, name){
        const data = await conn.query(
            `Update 2019_Workouts W Join 2019_Users_Workouts UW On W.ID = UW.WORKOUT_ID 
            Join Fitness_Users U On UW.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Workout Not Found')
        }else{
        return { status: "success", message: "Workout Succesfully Updated" };
        }
    },  
    async deleteWorkout(email, name){
        const data = await conn.query(
            `DELETE * FROM 2019_Workouts W Join 2019_Users_Workouts UW On W.ID = UW.WORKOUT_ID 
            Join Fitness_Users U On UW.USER_ID = U.ID 
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Workout Not Found')
        }else{
        return { status: "success", message: "Workout Succesfully Deleted" };
        }
    }, 
}; 

module.exports = model;
