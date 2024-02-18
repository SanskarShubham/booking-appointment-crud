const Appointment = require("../models/appointments");
const Meeting = require("../models/meetings");

exports.postAddAppointment = (req, res, next) => {
  const time = req.body.time;
  const slot = req.body.slot;

  Appointment.create({
    time: time,
    slot: slot,
  })
    .then((appointments) => {
      return res.status(200).json({
        status: true,
        data: appointments,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};



exports.getAppointments = (req, res, next) => {
  Appointment.findAll()
    .then((appointments) => {
      return res.status(200).json(appointments);
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};



exports.postDeleteMeeting = (req, res, next) => {
  const id = req.params.meetingId;
   let appointmentID;
  Meeting.findByPk(id)
    .then(mt => {
      
      return mt.destroy()
    })
    .then((m) => {
      appointmentID = m.appointmentId;
      return Appointment.findByPk(m.appointmentId);
    })
    .catch((err) => console.log(err))
    .then((ap) => {
      // appointmentData = ap;
      //  UPDATING THE APPOINTMENT SLOT 
      return Appointment.update(
        { slot: ap.slot + 1 },
        { where: { id: ap.id } }
      )
    })
    .then((mt) => {
      return res.status(200).json({
        status: true,
        data: appointmentID,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: err,
      });
    });

};

exports.postAddMeeting = (req, res, next) => {
  const name = req.body.name;
  const emailAdd = req.body.emailAdd;
  const appointId = req.body.appointId;
  const links = [
    "https://meet.google.com/eauk-bqqs-put",
    "https://meet.google.com/dfr-wnvs-dsa",
    "https://meet.google.com/lki-fgff-dirt",
    "https://meet.google.com/lio-oiyh-hjk",
    "https://meet.google.com/mls-klan-dfs",
    "https://meet.google.com/euk-wqqs-cut",
    "https://meet.google.com/euk-wqqs-cut",
    "https://meet.google.com/ojhf-fdfd-dej",
    "https://meet.google.com/dgg-wfdf-fdf",
  ];
  let meeting;
  let appointmentData;
  // ADDING USER MEETING DETAILS TO THE DATABASE
  Meeting.create({
    name: name,
    emailAdd: emailAdd,
    link: links[Math.floor(Math.random() * links.length)],
    appointmentId: appointId,
  })
    .then((m) => {
      meeting = m;
      return Appointment.findByPk(appointId);
    })
    .catch((err) => console.log(err))
    .then((ap) => {
      appointmentData = ap;
      //  UPDATING THE APPOINTMENT SLOT 
      return Appointment.update(
        { slot: ap.slot - 1 },
        { where: { id: appointId } }
      )
    })
    .catch((err) => console.log(err))
    .then(() => {

      return res.status(200).json({ meeting, appointmentData });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};

exports.getMeetings = (req, res, next) => {
  Meeting.findAll({
    include: [
      {
        model: Appointment,
        required: true,
      }
    ]
  })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch(err => console.log(err));
}
