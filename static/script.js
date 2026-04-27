/* ---------------------------
EVENT MANAGEMENT
--------------------------- 

document.addEventListener("DOMContentLoaded", function(){

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(){

slides.forEach(function(slide){
slide.style.display = "none";
});

slides[index].style.display = "block";

index++;

if(index >= slides.length){
index = 0;
}

}

setInterval(showSlide,3000);

showSlide();

});

setInterval(showSlide, 3000);

showSlide();*/

// 3 sec baad welcome hide + slider show
setTimeout(() => {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("slider").classList.remove("hidden");
}, 3000);

// Slider logic
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 3000);

/* Add Event */

function addEvent(){

let name = document.getElementById("eventName").value;
let date = document.getElementById("eventDate").value;

if(name === "" || date === ""){
alert("Please fill all fields");
return;
}

let event = {
name:name,
date:date
};

events.push(event);

localStorage.setItem("events", JSON.stringify(events));

alert("Event Added Successfully");

document.getElementById("eventName").value="";
document.getElementById("eventDate").value="";

displayEvents();
}

/* Display Events */

function displayEvents(){

let container = document.getElementById("eventList");

if(!container) return;

container.innerHTML="";

events.forEach(function(event,index){

let div = document.createElement("div");

div.classList.add("event-box");

div.innerHTML = `
<h2>${event.name}</h2>
<p>Date: ${event.date}</p>
<button onclick="deleteEvent(${index})">Delete</button>
`;

container.appendChild(div);

});

}

/* Delete Event */

function deleteEvent(index){

events.splice(index,1);

localStorage.setItem("events", JSON.stringify(events));

displayEvents();

}

function openGallery(id){
document.getElementById(id).style.display = "block";
}

function closeGallery(id){
document.getElementById(id).style.display = "none";
}

/* ---------------------------
STUDENT REGISTRATION
--------------------------- */

let students = JSON.parse(localStorage.getItem("students")) || [];

let form = document.getElementById("registerForm");

if(form){

form.addEventListener("submit", function(e){

// e.preventDefault();

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let event = document.getElementById("event").value;
let date = document.getElementById("date").value;

let student = {
name:name,
email:email,
event:event,
date:date
};

students.push(student);

localStorage.setItem("students", JSON.stringify(students));

alert("🎉 Registration Successful!");

form.reset();

});

}

function searchEvent(){

let input = document.getElementById("searchEvent").value.toLowerCase();
let cards = document.getElementsByClassName("event-card");

for(let i=0;i<cards.length;i++){

let title = cards[i].getElementsByTagName("h2")[0].innerText.toLowerCase();

if(title.includes(input)){
cards[i].style.display="block";
}
else{
cards[i].style.display="none";
}

}

}

let eventDate = new Date("April 10, 2026 10:00:00").getTime();

let x = setInterval(function(){

let now = new Date().getTime();

let distance = eventDate - now;

let days = Math.floor(distance / (1000 * 60 * 60 * 24));
let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

document.getElementById("timer").innerHTML =
days + " Days " + hours + " Hours ";

},1000);

/* ---------------------------
DISPLAY STUDENTS IN ADMIN PAGE
--------------------------- */
function displayEvents(){

let events = JSON.parse(localStorage.getItem("events")) || [];

let container = document.getElementById("eventList");

container.innerHTML="";

events.forEach(function(event,index){

let div = document.createElement("div");

div.innerHTML = `
<p><b>${event.name}</b></p>
<p>${event.date}</p>
<button onclick="deleteEvent(${index})">Delete</button>
<hr>
`;

container.appendChild(div);

});

}

/* Delete Student */

function deleteStudent(index){

students.splice(index,1);

localStorage.setItem("students", JSON.stringify(students));

displayStudents();

}

/* ---------------------------
ADMIN LOGIN
--------------------------- */

function login(){

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(username === "admin" && password === "1234"){

window.location.href = "admin.html";

}else{

alert("Invalid Username or Password");

}

}

/* ---------------------------
LOAD DATA WHEN PAGE OPENS
--------------------------- */

displayEvents();
displayStudents();