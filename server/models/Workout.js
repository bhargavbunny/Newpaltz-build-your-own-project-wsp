const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Workouts");   
    },
    async getWorkout(id){
        const data = await conn.query("SELECT * FROM 2019_Workouts WHERE Id=?", id);
        if(!data){
            throw Error("Workout not found");
        }
        return data[0];
    },
    async getID(input) {
        const data = await conn.query("SELECT ID FROM 2019_Workouts WHERE name=?", input.name);
        if(!data) {
            throw Error('Workout not added.')
        }
        return data;
    },
    async addWorkout(input){
        const data = await conn.query(
            `INSERT INTO 2019_Workouts W Join 2019_Users_Workouts UW On W.ID = UW.WORKOUT_ID 
            Join Fitness_Users U On UW.USER_ID = U.ID 
            (name,date_time,calories_burned,workout_minutes,created_at) WHERE U.VALUE=`, email, 
            [[input.name, input.date_time, input.calories_burned, input.workout_minutes, new Date()]]
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
