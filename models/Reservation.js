const sequelize = require('../Config/database');
const { DataTypes } = require('sequelize');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
 
    Check_in: {
        type: DataTypes.DATE,
        validate: {
            isAfter: new Date().toISOString().split('T')[0]
        }
    },
    Check_out: {
        type: DataTypes.DATE,
        validate: {
            isAfter: sequelize.col('Check_in'),
        }
    },
    Is_Reserved_in: {
        type: DataTypes.DATEONLY
    },
    Reservation_days: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})


module.exports = Reservation; 