document.addEventListener("DOMContentLoaded", () => {
  displayAppointments();
});

const baseUrl =
  "http://localhost:4000/api/";

const tableRef = document
  .getElementById("appoint-table")
  .getElementsByTagName("tbody")[0];
const nameTag = document.getElementById("name");
const emailid = document.getElementById("emailid");
const phone_no = document.getElementById("phone_no");
const id = document.getElementById("id");

function addAppoint(e) {
  e.preventDefault();

  const nameVal = nameTag.value.trim();
  const emailidVal = emailid.value.trim();
  const phone_noVal = phone_no.value.trim();
  const idVal = id.value.trim();

  if (nameVal === "" || emailidVal === "") {
    alert("Please enter both name and emailid.");
    return;
  }

  const patientDetail = {
    name: nameVal,
    emailAdd: emailidVal,
    phoneNo: phone_noVal,
  };

  console.log(idVal);
  if (idVal === "") {
   

    // add to server
    axios
      .post(baseUrl + 'add-user', patientDetail)
      .then((res) => {
         location.reload();
        
      })
      .catch((err) => console.log(err));
  } else {
    const newPatientDetail = {
      id: idVal,
      name: nameVal,
      emailAdd: emailidVal,
      phoneNo: phone_noVal,
    };
    axios
      .post(baseUrl + 'edit-user', newPatientDetail)
      .then((res) => {
        location.reload();
        // console.log(res.data);
        // displayAppointment(res.data);
      })
      .catch((err) => console.log(err));
  }
  nameTag.value = "";
  emailid.value = "";
  phone_no.value = "";
  idVal.value = "";
}

function displayAppointments() {
  axios
    .get(baseUrl + 'users')
    .then((appointments) => {

      appointments.data.data.forEach((appointment) => {
        displayAppointmentTable(appointment);
      });
    })
    .catch((err) => console.log(err));
}

function displayAppointment(appointment) {
  displayAppointmentTable(appointment);
}

function displayAppointmentTable(appointment) {
  const myHtmlContent = `
    <td>${appointment.name}</td>
    <td>${appointment.emailAdd}</td>
    <td>${appointment.phoneNo}</td>
    <td>
    <button onclick="updateAppointment('${appointment.id}',event)" class="btn btn-primary m-3">Edit</button>
    <button class="btn btn-danger removeConditionBtn" onclick="deleteAppointment('${appointment.id}',event)" >delete</button></td>`;
  var newRow = tableRef.insertRow(tableRef.rows.length);
  newRow.innerHTML = myHtmlContent;
}
function deleteAppointment(id, e) {
  const confirmRes = confirm("Are you sure want to delete ?");
  if (!confirmRes) {
    return;
  }
  axios
    .delete(baseUrl + 'delete-user/' + id)
    .then((res) => {

      if (res.status === 200) {
        // event.target will be the input element.
        var td = e.target.parentNode;
        var tr = td.parentNode; // the row to be removed
        tr.parentNode.removeChild(tr);
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
