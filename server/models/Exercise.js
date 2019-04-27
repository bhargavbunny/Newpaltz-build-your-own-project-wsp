const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM 2019_Exercizes");   
    },
    async getID(input) {
        const data = await conn.query("SELECT ID FROM 2019_Exercizes WHERE name=?", input.name);
        if(!data) {
            throw Error('Exercise not added.')
        }
        return data;
    },
    async getExercise(id){
        const data = await conn.query("SELECT * FROM 2019_Exrcizes WHERE Id=?", id);
        if(!data){
            throw Error("Exercise not found");
        }
        return data[0];
    },
    async addExercise(input){
        const data = await conn.query(
            `INSERT INTO 2019_Exercizes E Join 2019_Users_Exercizes UE On E.ID = UE.EXERCIZE_ID 
            Join 2019_Users U On UE.USER_ID = U.ID 
            (name,body_focus,reps,sets,date_created,date_updated) WHERE U.VALUE=`, email, 
            [[input.name, input.body_focus, input.reps, input.sets, input.date_created, new Date()]]
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateExercise(email, name){
        const data = await conn.query(
            `Update 2019_Exercizes E Join 2019_Users_Exercizes UE On E.ID = UE.EXERCIZE_ID 
            Join 2019_Users U On UE.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and E.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Exercise Not Found')
        }else{
        return { status: "success", message: "Exercise Succesfully Updated" };
        }
    },  
    async deleteExercise(email, name){
        const data = await conn.query(
            `DELETE * FROM 2019_Exercize E Join 2019_Users_Exercize UE On E.ID = UE.EXERCIZE_ID 
            Join 2019_Users U On UE.USER_ID = U.ID 
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Exercise Not Found')
        }else{
        return { status: "success", message: "Exercise Succesfully Deleted" };
        }
    }, 
}; 




module.exports = model;