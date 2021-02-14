// Define UI Variables
const taskInput1 = document.querySelector("#t1"); //the task input text field
const form = document.querySelector("#task-form"); //The form at the top
const filter = document.querySelector("#filter"); //the task filter text field
const taskList = document.querySelector(".collection"); //The UL
const clearBtn = document.querySelector(".clear-tasks"); //the all task clear button
const firName = document.getElementById("firName");
const mName = document.getElementById("mName");
const lName = document.getElementById("lName");



const dBirth = document.getElementById("dBirth");
const dName = document.getElementById("dName");
const address = document.getElementById("address");
const pNumber = document.getElementById("pNumber");
const symptom = document.getElementById("symptom");
const uName = document.getElementById("uName");
const password = document.getElementById("password");

const reloadIcon = document.querySelector(".fa"); 


let DB;


document.addEventListener("DOMContentLoaded", () => {
 
  let TasksDB = indexedDB.open("Hospital", 3);

  TasksDB.onsuccess = function (event) {
  
    console.log("database create successfully");
    DB = TasksDB.result;
  };
  TasksDB.onerror = function (event) {
 
    console.log("Error occurred");
  };


  TasksDB.onupgradeneeded = function (e) {
    console.log("Kide");
 
    let db = e.target.result;

 
    let objectStore = db.createObjectStore("tasks", {
      keyPath: "id",
      autoIncrement: true,
    });

    
    objectStore.createIndex("fullName", "fullName");
    objectStore.createIndex("birth", "birth");
    objectStore.createIndex("address", "address");
    objectStore.createIndex("doctor", "doctor");
    objectStore.createIndex("phone", "phone");
    objectStore.createIndex("dOpinion", "dOpinion");
    objectStore.createIndex("symptom", "symptom");
    objectStore.createIndex("status", "status");
    objectStore.createIndex("uName", "uName");
    objectStore.createIndex("password", "password");
    objectStore.createIndex("acceptance", "acceptance");
   
 

    let lobjectLabStore = db.createObjectStore("laboratory", {
      keyPath: "idd",
      autoIncrement: true,
    });

    lobjectLabStore.createIndex("fullName", "fullName");
    lobjectLabStore.createIndex("date", "date");
    lobjectLabStore.createIndex("test", "test");
    lobjectLabStore.createIndex("labResult", "labResult");
    lobjectLabStore.createIndex("labStatus", "labStatus");
  
  let docObjectStore = db.createObjectStore("doctor", {
    keyPath: "dId",
    autoIncrement: true,
  });

  docObjectStore.createIndex("docName", "docName");
  docObjectStore.createIndex("date", "date");
  docObjectStore.createIndex("docPassword", "docPassword");



  console.log("Database ready and fields created!");
  let labObjectStore = db.createObjectStore("labTech", {
    keyPath: "lId",
    autoIncrement: true,
  });

  labObjectStore.createIndex("labName", "labName");
  labObjectStore.createIndex("date", "date");
  labObjectStore.createIndex("labPassword", "labPassword");



  console.log("Database ready and fields created!");


};
 
       
  
  



});
