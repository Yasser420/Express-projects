const express = require('express');
const router = express.Router();
const { CreateRoom, getRooms, updateRoom, DeleteRoom, getRoomsWithStatus } = require('../Controllers/RoomOperations');
const { AuthenticateToken } = require('../Middleware/Auth')

const multer = require('multer');

const RoomImagesContainer = multer({ dest: 'RoomImagesContainer' });

router.route('/rooms').post(RoomImagesContainer.single('Image'), CreateRoom).get(getRooms)
router.route('/rooms/:id').patch(updateRoom).delete(DeleteRoom);

module.exports = router; 