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


function changeMeetingSot(dataInfoID,incORdec) {
   // Select the button element using data-info attribute value
   const button = document.querySelector(`[data-info="${dataInfoID}"]`);
    // console.log(button);
   // Update the content of the span element inside the button
   if (button) {
     const span = button.querySelector('span.badge');
     if (span) {
      let slot =  parseInt(span.textContent.match(/\d+/)[0]); 
      slot += incORdec;
      if (slot >0) {
        button.classList.remove('d-none');
        span.textContent =`${slot} Available`;
      }else{
        span.textContent =`${slot} Available`;
        button.classList.add('d-none');
      }
     }
   }

}

   

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
      changeMeetingSot(appointmentIdVal,-1);
      appointmentModel.hide();
      displayUserMeeting(res.data);
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
      appointments.data.forEach((appointment) => {
       

          // Create a new button element
          var newButton = document.createElement("button");
          // Set attributes for the button
          newButton.setAttribute("type", "button");
          
          newButton.setAttribute("data-bs-toggle", "modal");
          newButton.setAttribute("data-info", appointment.id);
          if (appointment.slot <= 0) {
            newButton.setAttribute("class", "add-appointment mx-2 btn btn-lg btn-outline-dark d-none");
          }else{
            newButton.setAttribute("class", "add-appointment mx-2 btn btn-lg btn-outline-dark");
          }

          newButton.innerHTML = `${convertToAMPM(appointment.time)} <br><span class=\"badge bg-success \">${appointment.slot} Available </span>`;
          appointmentSlot.appendChild(newButton);
       
      });
      cb();
     
    })
    .catch((err) => { console.log(err); alert('Please start your server.') });
}





function displayMeetings() {
  axios
    .get(baseUrl + 'meetings')
    .then((meetings) => {
      meetings.data.forEach((userData) => {
        // Create a new div element
        var newDiv = document.createElement("div");

        // Set attributes for the div
        newDiv.setAttribute("class", "col-sm-4 mb-3 mb-sm-3");

        newDiv.innerHTML = `  <div class="card" style="width: 18rem;">
                  <div class="card-body">
                      <h5 class="card-title">Hi ${userData.name}</h5>
                      <p class="card-text">please join the meeting via this: <a href="${userData.link}"
                              class="card-link" target="_blank">${userData.link}</a> link at ${convertToAMPM(userData.appointment.time)}.</p>
                      <a href="#" target="_blank" onclick="deleteMeeting(event,${userData.id})" class="btn btn-sm btn-danger">Cancel</a>
                  </div>
                </div>`;
        userAppointmentsDiv.appendChild(newDiv);
      });

    })
    .catch((err) => { console.log(err); });
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
                              <a href="#" target="_blank" onclick="deleteMeeting(event,${userData.meeting.id})" class="btn btn-sm btn-danger">Cancel</a>
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


function deleteMeeting(e, id) {
  e.preventDefault();
  const confirmRes = confirm("Are you sure want to cancel meeting ?");
  if (!confirmRes) {
    return;
  }
  
  axios
    .delete(baseUrl + 'delete-meeting/' + id)
    .then((res) => {
       console.log(res.data);
      if (res.status === 200) {
        changeMeetingSot(res.data.data,1);
        let p1 = e.target.parentNode;
        var p2 = p1.parentNode; // the row to be removed
        var p3 = p2.parentNode; // the row to be removed
        p3.parentNode.removeChild(p3);
      }
    })
    .catch((err) => console.log(err));
}



