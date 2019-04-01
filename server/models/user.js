const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 8;

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM fitness_user");   
    },
    async get(id){
        return await conn.query("SELECT * FROM fitness_user WHERE Id=?", id);    
    },
    async add(input){
        const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO fitness_user (username,email,password,createdAt,updatedAt) VALUES (?)",
            [[input.username, input.username, hashedPassword, new Date(), new Date()]] 
        );
        return await model.get(data.insertId);
    },
    async login(email, password){
        const data = await conn.query(`SELECT * FROM fitness_user P
                        Join 2019fitness_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].password);
        if(x){
            return data[0];
        }else{
            throw Error('Wrong Password');
        }
    },
    async changePassword(email, oldPassword, newPassword){
        const data = await conn.query(`SELECT * FROM fitness_user P
                        Join 2019fitness_ContactMethods CM On CM.Person_Id = P.id
                    WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found')
        }
        if(data[0].password == "" || await bcrypt.compare(oldPassword, data[0].password)){
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`Update fitness_user P
                            Set ?
                        WHERE P.id=?`,[ {password: hashedPassword }, data[0].id]);
            return { status: "success", msg: "Password Succesfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }
};

module.exports = model;