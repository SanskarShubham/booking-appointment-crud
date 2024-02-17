const express = require('express');

const appointmentController = require('../controllers/booking_app');

const router = express.Router();

// /api/add-appointment => GET
// router.get('/add-appointment', appointmentController.getAddAppointment);

// /api/appointments => GET
  router.get('/appointments', appointmentController.getAppointments);

// // /api/add-appointment => POST
// router.get('/edit-appointment/:appointmentid', appointmentController.getEditAppointment);
 router.post('/add-appointment', appointmentController.postAddAppointment);
 router.post('/add-meeting', appointmentController.postAddMeeting);



// router.post('/edit-appointment/', appointmentController.postEditAppointment);
 router.delete('/delete-meeting/:meetingId', appointmentController.postDeleteMeeting);

router.get('/meetings', appointmentController.getMeetings);
module.exports = router;
