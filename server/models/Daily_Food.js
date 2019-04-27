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

    // HAVE TO ADD CALORIE TOTAL QUERY!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    /* async getCalorieTotal(){
        const data = await conn.query("SELECT calorie_amount FROM Fitness_Food_Items WHERE Id=?", id);
        if(!data){
            throw Error("Not found");
        }
        return data[0];
    }, */
}; 

/* const model = {
    getAll(cb){ // return all days worth of logs form THAT user how to specify?
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } // ****** WHY IS ROUTINE "NEVER USED"?
            var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                    cb(err,data);
                      return; 
                }
                conn.query("SELECT * FROM Fitness_Daily_Foods WHERE ID=?", [[input.thisID]], (err, data) => {
                    cb(err, data);   
                })
            });    
        });
    },
    get(id, cb){ // return todays food log from THAT user
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } 
            var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                conn.query("SELECT * FROM Fitness_Daily_Foods WHERE date=? AND ID=?", [[input.date, input.thisID]], (err, data) => {
                    cb(err, data[0]);
                });
            });
        });    
      },
    add(input, cb){ // need to add food Itmes - how to link it with the other table?- grab items form there?
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
                var newadd = conn.query('INSERT ' + Fitness_Daily_Foods + ' SET ID = ' + mysql.escape(ID) + 
                                ', date = ' + mysql.escape(date) +
                                ', date_created = ' + mysql.escape(new Date()) +
                                ', calorie_total = ' + mysql.escape(calorie_total) +
                                ' WHERE Fitness_Users_Daily_Foods_User_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + newadd + 'FROM ' + Fitness_Daily_Foods, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                        
                    });
                });
        });
    },
    updateDailyFoods(input, cb){  // do my input arrays correspond to whats being input for specification (email and name) or for the table values?
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var update = conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE date=? AND ID=?", [[input.date, input.thisID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
         var change = conn.query('INSERT ' + Fitness_Daily_Foods + ' SET ID = ' + mysql.escape(ID) + 
                                ', date = ' + mysql.escape(date) +
                                ', date_created = ' + mysql.escape(new Date()) +
                                ', calorie_total = ' + mysql.escape(calorie_total) +
                                ' WHERE Fitness_Users_Daily_Foods_User_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + change + 'FROM ' + Fitness_Daily_Foods, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                    });
                });
    },
    //delete a specific workout by email and workout name
    deleteDailyFoods(input,cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var deleted = conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE date=? AND ID=?", 
        [[input.date, input.thisID]],(err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
        conn.query("DELETE * FROM Fitness_Daily_Foods WHERE ID=?", 
        [[input.deleted]], (err, data) => {
            cb(err, data[0]);
        });
    },
    getTotalCalories(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", 
                [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        conn.query("SELECT calorie_total FROM Fitness_Daily_Foods WHERE ID=?", [[input.thisID]],
        (err, data) => { 
            cb(err, data[0]);
          });
        
    },

    addFoodItems(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
             // ****** WHY IS ROUTINE "NEVER USED"?
            var foodID = conn.query("SELECT * FOOD_ITEMS_ID FROM Fitness_Users_Food_Items WHERE USER_ID=?", 
            [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                var foodName = conn.query("SELECT name FROM Fitness_Food_Items WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                    if(err) {
                      cb(err,data);
                        return; 
                    }  // do if else, if foodname doesnt exist, throw error
                    conn.query('INSERT ' + Fitness_Daily_Foods + 'ADD Fitness_Daily_Foods_Food_name = ' + 
                    [[insert.foodName]], (err) => {
                        if (err) throw err;    
                    
                    })
                var foodCalroieAmount = conn.query("SELECT caloie_amount FROM Fitness_Food_Items WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                        if(err) {
                          cb(err,data);
                            return; 
                        }
                        conn.query("UPDATE calorie_total FROM Fitness_Daily_Foods WHERE calorie_total = calorie_total + ?" + 
                        [[insert.foodCalorieAmount]], (err) => {
                            if (err) throw err;   

                        })
                    });
                });
            });
        });
    },

    deleteFoodItems(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
             // ****** WHY IS ROUTINE "NEVER USED"?
            var foodID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", 
            [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                var foodName = conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                    if(err) {
                      cb(err,data);
                        return; 
                    }
                 // insert exercize into routine
                 conn.query("DELETE Food_name FROM Fitness_Daily_Foods WHERE ID=?", 
                 [input.foodName], (err, data) => {
                     cb(err, data[0]);
                 });
                 var foodCalroieAmount = conn.query("SELECT caloie_amount FROM Fitness_Food_Items WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                        if(err) {
                          cb(err,data);
                            return; 
                        }
                        conn.query("UPDATE calorie_total FROM Fitness_Daily_Foods WHERE calorie_total = calorie_total - ?" + 
                        [[insert.foodCalorieAmount]], (err) => {
                            if (err) throw err;   

                        })
                    });
                });
            });
        });
    },
}; */

module.exports = model;
