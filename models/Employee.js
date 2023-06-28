const sequelize = require('../Config/database');
const { DataTypes } = require('sequelize');
const valid_Password = require('../Utiles/valid_password');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    Email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'The provided Email is not acceptable '
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            valid_Password
        }
    }
})
module.exports = Employee; 