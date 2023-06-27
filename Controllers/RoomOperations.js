const { MulterError } = require('multer');
const Room = require('../models/Room');
const CustomError = require('../Utiles/CustomError');
const { and, Op, where } = require('sequelize');
const Reservation = require('../models/Reservation');

const CreateRoom = (req, res, next) => {
    try {
        const { Room_number, Cost_per_Day, Max_guests } = req.body;
        const NewRoom = Room.create({
            Room_number: Room_number,
            Cost_per_Day: Cost_per_Day,
            Max_guests: Max_guests,
            Image_path: '../RoomImagesContainer'
        }).then((NewRoom) => {
            res.status(200).json({
                'Message': 'The Room created Successfully', data: {
                    id: NewRoom.id, Room_number: Room_number,
                    Cost_per_Day: Cost_per_Day,
                    Room_status: 'Ready', Max_guests: Max_guests
                }
            }
            )

        }).catch((err) => {
            const error = new CustomError(err.message, 400);
            next(error);
        })
    } catch (err) {
        const error = new CustomError("server error", 500);
        next(error);
    }

}

const getRooms = async (req, res, next) => {
    try {
        const { status } = req.query;
        StatusOfRooms = ['Ready', 'Maintaining', 'Occupied'];
         
        let Rooms = [];
        if (!status) {
            Rooms = await Room.findAll()
        }
        else if (status) {
            CapitalStatus = status.charAt(0).toUpperCase() + status.slice(1);
            if (!StatusOfRooms.includes(CapitalStatus)) {
                const error = new CustomError(`There is no room with status:${status}`, 404)
                next(error)
            }
            else {
                Rooms = await Room.findAll({ where: { Room_status: CapitalStatus } })
            }
        }

        res.status(200).json({ 'Message': 'Success', 'data': Rooms })

    } catch (err) {
        const error = new CustomError(err.message, 500);
        next(error)
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const RoomId = req.params.id;
        const FindRoomWithId = await Room.findOne({ where: { id: RoomId } });
        if (!FindRoomWithId) {
            const error = new CustomError(`There is no Room with id:${RoomId}`, 404);
            next(error);
        }

        const { Room_number } = req.body;
        const Room_With_The_Same_Room_Num = await Room.findOne({ where: { Room_number, id: { [Op.ne]: req.params.id } } })
        if (Room_With_The_Same_Room_Num) {
            const error = new CustomError('The Room number is already used for other existing Room', 400);
            next(error);
        }

        const updatedRoom = await Room.update(req.body, {
            where: { id: req.params.id },
            returning: true
        })
        res.status(200).json({ 'Message': `The Room with id=${req.params.id} is updated successfully`, 'data': updatedRoom })
    } catch (err) {
        const error = new CustomError(err.message, 400);
        next(error);
    }
}
const DeleteRoom = async (req, res, next) => {
    try {
        const RoomId = req.params.id;
        const deletedRoom_Reservations = await Reservation.destroy({ where: { Room_id: RoomId }, returning: true })
        const deletedRoom = await Room.destroy({ where: { id: RoomId }, returning: true })
        if (deletedRoom == 0) {
            const error = new CustomError(`No Room with id:${RoomId}`, 404)
            throw (error)
        }
        res.status(200).json({ 'Message': 'The Room Deleted Successfuly' })

    } catch (err) {
        const error = new CustomError(err.message, 404)
        next(error)
    }
}
const getRoomsWithStatus = async (req, res, next) => {
    const status = req.query;
    console.log(status);
}
module.exports = { CreateRoom, getRooms, updateRoom, DeleteRoom, getRoomsWithStatus };