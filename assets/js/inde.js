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