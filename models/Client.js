const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const Reservation = require('./Reservation')
const valid_Password = require('../Utiles/valid_password');

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    First_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    Last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        unique:{
            args:true , 
            msg:'The Email is already used for other account'
        } , 
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            valid_Password
        }
    },
    address: {
        type: DataTypes.STRING,

    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: {
            args:true , 
            msg: 'The phone number is used for other account'
        },
    },
})

module.exports = Client