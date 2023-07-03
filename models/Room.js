const sequelize = require('../Config/database');
const { DataTypes } = require('sequelize');
const path = require('path');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    Room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
            args:true , 
            msg:'The room number is exists'
        } , 
        validate: {
            isNumeric: true,

        }

    },
    Cost_per_Day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,

        }
    },
    Room_status: {
        type: DataTypes.STRING,
        defaultValue: 'Ready',
        allowNull: false,
    },
    Max_guests: {
        type: DataTypes.INTEGER,
        validate: {
            AcceptableGuestsNumber(number) {
                if (number < 1 || number > 4) {
                    throw new Error('Guests number for the Room must be between one and four')
                }
            },
            isNumeric: true
        }
    },
    Image_path: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate:{
            notEmpty:{
                msg:'The Image file required'
            }
        }
    }

})
module.exports = Room; 
