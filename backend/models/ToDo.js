const { DataTypes } = require ("sequelize");
const sequelize =require("../config/db");

const ToDo = sequelize.define("ToDo",{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    completed:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
});

module.exports =ToDo;