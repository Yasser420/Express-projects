const Client = require('../models/Client');
const Reservation = require('../models/Reservation');
const Employee = require('../models/Employee');
const Room = require('../models/Room');

Client.hasMany(Reservation, { as: 'ClientReservation', foreignKey: 'Client_id' });
Employee.hasMany(Reservation, { as: 'EmployeeReservation', foreignKey: 'Employee_id' });
Room.hasMany(Reservation, { as: 'RoomReservation', foreignKey: 'Room_id' });

Reservation.belongsTo(Client, { foreignKey: 'Client_id' });
Reservation.belongsTo(Employee, { foreignKey: 'Employee_id' });
Reservation.belongsTo(Room, { foreignKey: 'Room_id' });