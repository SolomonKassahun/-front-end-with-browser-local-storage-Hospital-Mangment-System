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
        let doc1 = {
            labName : "wase",
            date : new Date(),
            labPassword : "wase4252"
          }
        
        let ob = DB.transaction(['labTech'],"readwrite").objectStore("labTech")
        ob.add(doc1)
        
        
    }
    patientDB.onupgradeneeded = function(e){
        let db = e.target.result
        // let objectStore = db.createObjectStore('tasks',{keyPath:'id',autoIncrement:true})
        // objectStore.createIndex('hms','hms',{unique:false})
        // console.log('database reafg')
    }  
  
  form.addEventListener("submit", addNewTask);
  function addNewTask(e) {
    e.preventDefault();
    let objectStore = DB.transaction('labTech').objectStore('labTech')
    objectStore.openCursor().onsuccess = function(e){
          
        let cursor = e.target.result
        if(cursor){

            console.log(cursor.value.uName)

            if((cursor.value.labName == userN.value) && (cursor.value.labPassword == pass.value)){
              location.href = `labratory.html`;
              form.reset();
          

                
            }
            cursor.continue();

            
        }
        }



    
  }
//   function DisplayPatient(){
        
//     let objectStore = DB.transaction('tasks').objectStore('tasks')
//     objectStore.openCursor().onsuccess = function(e){
//         let cursor = e.target.result

//         if((cursor.value.uName == "kidus")&& (cursor.value.password == "kide7981")){
//             window.open("faculity.html");



});