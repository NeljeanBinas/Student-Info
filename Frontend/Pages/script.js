console.log("System Succesfully Connected");

// Global variables In herte Continue YT Vudeo To SEE
let mainContainer = document.querySelector(".main-container");

let selectedStudentID = null;

//Load The Student List From The Database Look At Consdole For Confirmation
function loadStudents() {
  fetch("http://localhost:3000/students")
    .then((response) => response.json())

    .then((data) => {
      let table = document.getElementById("studentTableBody");

      table.innerHTML = "";

      data.forEach((student) => {
        table.innerHTML += `

            <tr
                data-id="${student.id}"
                data-last="${student.lastName}"
                data-first="${student.firstName}"
                data-middle="${student.middleName}"
                data-gender="${student.gender}"
                data-academic="${student.academicLevel}"
                data-section="${student.section}"
                data-email="${student.email}"
            >
                <td>${student.lastName}</td>
                <td>${student.firstName}</td>
                <td>${student.middleName}</td>
                <td>${student.gender}</td>
                <td>${student.academicLevel}</td>
                <td>${student.section}</td>
                <td>${student.email}</td>

            </tr>
            `;
      });
    })

    .catch((error) => {
      console.log("Loading Error:", error);
    });
}

// Load students when opening page, And Refresh IF It Deosnt Work Restart Thew TAb For Troubleshoot
loadStudents();

//Row Selection TAble
document
  .getElementById("studentTableBody")
  .addEventListener("click", function (event) {
    let row = event.target.closest("tr");

    if (!row) {
      return;
    }

    selectedStudentID = row.dataset.id;

    document.getElementById("lastName").value = row.dataset.last;
    document.getElementById("firstName").value = row.dataset.first;
    document.getElementById("middleName").value = row.dataset.middle;
    document.getElementById("gender").value = row.dataset.gender;
    document.getElementById("academicLevel").value = row.dataset.academic;
    document.getElementById("section").value = row.dataset.section;
    document.getElementById("email").value = row.dataset.email;

    // Open information panel
    mainContainer.classList.remove("collapsed");

    console.log("Selected Student ID:", selectedStudentID);
  });

//Save sRTUDENT Function
let saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function () {
  let student = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    middleName: document.getElementById("middleName").value,
    gender: document.getElementById("gender").value,
    academicLevel: document.getElementById("academicLevel").value,
    section: document.getElementById("section").value,
    email: document.getElementById("email").value,
  };

  console.log(student);
  fetch("http://localhost:3000/addStudent", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(student),
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      //REFresh

      loadStudents();
    })

    .catch((error) => {
      console.log("Error:", error);
    });
});

//CAncel Button Deletes And Wipes out the Form
let cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", function () {
  document.getElementById("lastName").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("middleName").value = "";
  document.getElementById("gender").value = "Male";
  document.getElementById("academicLevel").value = "";
  document.getElementById("section").value = "";
  document.getElementById("email").value = "";

  selectedStudentID = null;
});

//Collapse On Click
let toggleButton = document.getElementById("togglePanel");

mainContainer.classList.add("collapsed");

toggleButton.addEventListener("click", function () {
  console.log("Toggle Clicked");

  mainContainer.classList.toggle("collapsed");
});

//Add Another Item (Students)
let addButton = document.getElementById("addButton");
addButton.addEventListener("click", function () {
  // Open panel Remove the Collapsed State From Earlier WHen Clickled acgain
  mainContainer.classList.remove("collapsed");

  // Clear form (Same as CAnsel, Will Delete LAtewr )

  document.getElementById("lastName").value = "";

  document.getElementById("firstName").value = "";

  document.getElementById("middleName").value = "";

  document.getElementById("gender").value = "Male";

  document.getElementById("academicLevel").value = "";

  document.getElementById("section").value = "";

  document.getElementById("email").value = "";

  selectedStudentID = null;
});

//Delete Already Logged Stude=nt6
let deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", function () {
  if (!selectedStudentID) {
    alert("Please select a student first!");

    return;
  }
  let confirmDelete = confirm("Are you sure you want to delete this student?");

  if (!confirmDelete) {
    return;
  }
  fetch(`http://localhost:3000/deleteStudent/${selectedStudentID}`, {
    method: "DELETE",
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      // Refresh table Contingency IF the First Load Didnt JHAppen, I will Load Once more
      loadStudents();

      // Clear
      document.getElementById("lastName").value = "";
      document.getElementById("firstName").value = "";
      document.getElementById("middleName").value = "";
      document.getElementById("gender").value = "Male";
      document.getElementById("academicLevel").value = "";
      document.getElementById("section").value = "";
      document.getElementById("email").value = "";
      selectedStudentID = null;
    })

    //Function CAll if The Deletion Encounters an E#rror
    .catch((error) => {
      console.log("Delete Error:", error);
    });
});
