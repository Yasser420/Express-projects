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
    guest_name: {
        type: DataTypes.STRING
    },
    date_of_request: {
        type: DataTypes.DATEONLY
    },
    begin_of_reservation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Reservation_days_num: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
        validate: {
            defaultValue: 'Pending',
            isIn: [['Pending', 'Accepted', 'Rejected']],
            msg: 'The status must be Pending , Accepted , or Rejected'
        }
    }
})

module.exports = Reservation; 