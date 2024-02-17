// This function initializes a modal for appointments using Bootstrap Modal
// It listens for the DOMContentLoaded event and then calls displayAppointments function
var appointmentModel = new bootstrap.Modal(document.getElementById('appointmentModel'), {});
document.addEventListener("DOMContentLoaded", () => {
  displayAppointments(displayButtons);
  displayMeetings();
});

const displayButtons = () => {
  var buttons = document.querySelectorAll('.add-appointment');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var buttonData = this.getAttribute('data-info');
      document.getElementById('appointment-id').value = buttonData;
      appointmentModel.show();
    });
  });
}
const baseUrl = "http://localhost:4000/api/";

const appointmentSlot = document.getElementById("appointment-slot");
const userAppointmentsDiv = document.getElementById("user-appointments");


const nameTag = document.getElementById("username");
const emailId = document.getElementById("eamilId");
const appointmentId = document.getElementById("appointment-id");
// const id = document.getElementById("id");

function addAppointment(e) {
  e.preventDefault();

  const nameVal = nameTag.value.trim();
  const emailIdVal = emailId.value.trim();
  const appointmentIdVal = appointmentId.value.trim();
  console.log(nameVal, emailIdVal, appointmentIdVal);
  if (nameVal === "" || emailIdVal === "") {
    alert("Please enter both name and emailid.");
    return;
  }

  const apppointDetail = {
    name: nameVal,
    emailAdd: emailIdVal,
    appointId: appointmentIdVal,
  };

  // add to server
  axios
    .post(baseUrl + 'add-meeting', apppointDetail)
    .then((res) => {
      appointmentModel.hide();
      displayUserMeeting(res.data);
      console.log(res.data);
    

    })
    .catch((err) => console.log(err));

    nameTag.value = "";
  emailId.value = "";
  appointmentId.value = "";

}


function displayAppointments(cb) {
  axios
    .get(baseUrl + 'appointments')
    .then((appointments) => {
      //  console.log(appointments);
      appointments.data.forEach((appointment) => {
        if (appointment.slot > 0) {
          displayAppointment(appointment);

        }
      });
      cb();
    })
    .catch((err) => {console.log(err);alert('Please start your server.')});
}



function displayAppointment(appointment) {
  // Create a new button element
  var newButton = document.createElement("button");

  // Set attributes for the button
  newButton.setAttribute("type", "button");
  newButton.setAttribute("class", "add-appointment btn btn-lg btn-outline-dark");
  newButton.setAttribute("data-bs-toggle", "modal");
  newButton.setAttribute("data-info", appointment.id);
  newButton.innerHTML = `${convertToAMPM(appointment.time)} <br><span class=\"badge bg-success \">${appointment.slot} Available </span>`;
  appointmentSlot.appendChild(newButton);
}

function displayMeetings() {
  axios
    .get(baseUrl + 'meetings')
    .then((meetings) => {
      meetings.data.forEach((meeting) => {
        displayAllMeeting(meeting);
      });
      
    })
    .catch((err) => {console.log(err);});
}


function displayUserMeeting(userData) {
  // Create a new div element
  var newDiv = document.createElement("div");
  
  // Set attributes for the div
  newDiv.setAttribute("class", "col-sm-4 mb-3 mb-sm-0");
  
  newDiv.innerHTML = `  <div class="card" style="width: 18rem;">
  <div class="card-body">
      <h5 class="card-title">Hi ${userData.meeting.name}</h5>
      <p class="card-text">please join the meeting via this: <a href="${userData.meeting.link}"
              class="card-link" target="_blank">${userData.meeting.link}</a> link at ${convertToAMPM(userData.appointmentData.time)}.</p>
      <a href="#" target="_blank" onclick="deleteMeeting(event,${userData.meeting.appointmentId})" class="btn btn-sm btn-danger">Delete</a>
  </div>
</div>`;
userAppointmentsDiv.appendChild(newDiv);
}

function displayAllMeeting(userData) {
  // Create a new div element
  var newDiv = document.createElement("div");
  
  // Set attributes for the div
  newDiv.setAttribute("class", "col-sm-4 mb-3 mb-sm-3");
  
  newDiv.innerHTML = `  <div class="card" style="width: 18rem;">
  <div class="card-body">
      <h5 class="card-title">Hi ${userData.name}</h5>
      <p class="card-text">please join the meeting via this: <a href="${userData.link}"
              class="card-link" target="_blank">${userData.link}</a> link at ${convertToAMPM(userData.appointment.time)}.</p>
      <a href="#" target="_blank" onclick="deleteMeeting(event,${userData.id})" class="btn btn-sm btn-danger">Delete</a>
  </div>
</div>`;
userAppointmentsDiv.appendChild(newDiv);
}


function convertToAMPM(time24) {
  const [hours, minutes] = time24.split(':');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const twelveHour = hours % 12 || 12;
  return `${twelveHour}:${minutes}:${suffix}`;
}


function deleteMeeting(e,id) {
  e.preventDefault();
  const confirmRes = confirm("Are you sure want to delete ?");
  if (!confirmRes) {
    return;
  }
  let p1  = e.target.parentNode;
  var p2 = p1.parentNode; // the row to be removed
  var p3 = p2.parentNode; // the row to be removed
   p3.parentNode.removeChild(p3);

  axios
    .delete(baseUrl + 'delete-meeting/' + id)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        // event.target will be the input element.
       
      }
    })
    .catch((err) => console.log(err));
}

function updateAppointment(userId, e) {
  axios
    .get(baseUrl + '/edit-user/' + userId)
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        // event.target will be the input element.
        var td = e.target.parentNode;
        var tr = td.parentNode; // the row to be removed

        // inserting the values in form input
        nameTag.value = tr.childNodes[1].textContent;
        emailid.value = tr.childNodes[3].textContent;
        phone_no.value = tr.childNodes[5].textContent;
        id.value = userId;
        //deleting the row
        tr.parentNode.removeChild(tr);
      }
    })
    .catch((err) => console.log(err));
}

// JavaScript to handle button clicks and modal interaction
document.addEventListener('DOMContentLoaded', function () {

});
