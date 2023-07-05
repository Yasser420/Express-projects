const sequelize = require("../Config/database");
const CustomError = require("../Utiles/CustomError");
const Client = require("../models/Client");
const Reservation = require("../models/Reservation");

//this function is used by the Client to book a certain room.
const booking_request = async (req, res, next) => {
    try {
        const room_id = req.params.id;
        const clientID = req.user.clientID;
        const { begin_of_reservation, end_of_reservation } = req.body;

        const userData = await Client.findOne({ where: { id: clientID } });
        const full_name = userData.First_name + ' ' + userData.Last_name;
        const date1 = new Date(begin_of_reservation);
        const date2 = new Date(end_of_reservation);

        const timeDifference = date2.getTime() - date1.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        const NewRequest = await Reservation.create({
            guest_name: full_name,
            Room_id: room_id,
            Reservation_days_num: daysDifference,
            date_of_request: new Date().getTime(),
            begin_of_reservation,
            Client_id: clientID
        })
        res.status(200).json({ 'Message': 'Request are sent', data: NewRequest })
    } catch (error) {
        const err = new CustomError(error.message, 400);
        console.log(error.message);
        next(err);
    }

}

//this functinon is used from the employee,  which can accept or reject the request of booking from the Client 
const handle_request = async (req, res, next) => {
    try {
        const booking_id = req.params.id;
        const { accept } = req.body;

        const booking_record = await Reservation.findByPk(booking_id);

        if (!booking_record) {
            const error = new CustomError('No Booking request with the given ID', 404);
            next(error)
        }

        if (accept == "true") {
            const empID = req.user.empID
            console.log(req.user);

            try {
                console.log('hay');
                const process = await sequelize.transaction(async (t) => {
                    booking_record.status = "Accepted";
                    booking_record.Employee_id = empID;
                    await booking_record.save({ transaction: t });
                    return res.status(200).json({ 'Message': 'Success' })
                })
            } catch (err) {
                const error = new CustomError(err.message, 500);
                next(error)
            }
        }
    } catch (error) {
        const err = new CustomError(err.message, 500);
        console.log(err);
        console.log('----------error-----------');

        next(error)
    }
}
module.exports = { booking_request, handle_request };
