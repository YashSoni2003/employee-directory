
let employees = [...mockEmployees];
let currentPage = 1;
let itemsPerPage = 10;
let editingId = null;

const employeeContainer = document.getElementById("employee-list-container");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("employee-form");

function renderEmployees() {
  employeeContainer.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = employees.slice(start, start + itemsPerPage);

  paginatedEmployees.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    employeeContainer.appendChild(card);
  });
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(emp => emp.id !== id);
    renderEmployees();
  }
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  editingId = id;
  formContainer.classList.remove("hidden");
  document.getElementById("form-title").innerText = "Edit Employee";
  document.getElementById("employee-id").value = emp.id;
  form.firstName.value = emp.firstName;
  form.lastName.value = emp.lastName;
  form.email.value = emp.email;
  form.department.value = emp.department;
  form.role.value = emp.role;
}

document.getElementById("add-employee-btn").addEventListener("click", () => {
  editingId = null;
  form.reset();
  formContainer.classList.remove("hidden");
  document.getElementById("form-title").innerText = "Add Employee";
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  formContainer.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newEmp = {
    id: editingId ? editingId : Date.now(),
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    department: form.department.value.trim(),
    role: form.role.value.trim(),
  };

  if (!newEmp.firstName || !newEmp.lastName || !newEmp.email) {
    alert("All fields are required!");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(newEmp.email)) {
    alert("Invalid email!");
    return;
  }

  if (editingId) {
    employees = employees.map(emp => emp.id === editingId ? newEmp : emp);
  } else {
    employees.push(newEmp);
  }

  formContainer.classList.add("hidden");
  form.reset();
  renderEmployees();
});

renderEmployees();
