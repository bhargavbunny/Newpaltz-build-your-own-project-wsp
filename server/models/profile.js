const conn = require('./mysql_connection');

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM fitness_user_profile");   
    },
    async get(id){
        return await conn.query("SELECT * FROM fitness_user_profile WHERE Id=?", id);    
    },
    async add(input){
        const data = await conn.query(
            "INSERT INTO fitness_user_profile (firstname,lastname,birthday,height,weight,age) VALUES (?)",
            [[input.firstname, input.lastname, input.birthday, input.height, input.weight, input.age]] 
        );
        return await model.get(data.insertId);
    }
}

module.exports = model;