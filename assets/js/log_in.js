const form = document.querySelector("#login_Form"); 
const userN = document.querySelector("#uNameInput"); 
const pass = document.querySelector("#passwordInput");

let DB;

// Add Event Listener [on Load]
document.addEventListener("DOMContentLoaded", () => {
  //all code will reside here
  let patientDB = indexedDB.open("Hospital", 3);
  patientDB.onerror = function(e){
    console.log('error happen')
    }
    patientDB.onsuccess = function(e){
        console.log('success')
        DB = patientDB.result
        // DisplayPatient()
    }
    patientDB.onupgradeneeded = function(e){
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
  
    }



  
  
  form.addEventListener("submit", addNewTask);
  function addNewTask(e) {
    e.preventDefault();
    let objectStore = DB.transaction('tasks').objectStore('tasks')
    objectStore.openCursor().onsuccess = function(e){
        
        let cursor = e.target.result
        if(cursor){

            console.log(cursor.value.uName)

            if((cursor.value.uName == userN.value) && (cursor.value.password == pass.value)){
              location.href = `patient_info.html?id=${cursor.value.id}`;
              form.reset();
          

                
            }
            cursor.continue();

            
        }
        }



    
  }



});