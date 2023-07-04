const CustomError = require("../Utiles/CustomError");
const Client = require("../models/Client");
const Reservation = require("../models/Reservation");

const booking_request = async (req, res, next) => {
    try {
        const room_id = req.params.id;
        const clientID = req.user.clientID;
        const { begin_of_reservation, end_of_reservation } = req.body;
        
        const userData = await Client.findOne({ where: { id: clientID } });
        const full_name = userData.First_name + ' ' + userData.Last_name;
        const date1 = new Date(begin_of_reservation) ; 
        const date2 = new Date(end_of_reservation); 

        const timeDifference = date2.getTime() - date1.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        const NewRequest = await Reservation.create({
            guest_name: full_name,
            Room_id: room_id,
            Reservation_days_num: daysDifference , 
            date_of_request: new Date(),
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
module.exports = { booking_request };
