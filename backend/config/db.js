const { Sequelize } =require("sequelize");

const sequelize =new Sequelize("TodoApp_db","root","Root@123",{
    host:"localhost",
    dialect:"mysql",
});

module.exports = sequelize;