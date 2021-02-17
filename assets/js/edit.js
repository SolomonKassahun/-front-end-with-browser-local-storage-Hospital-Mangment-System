//UI variables
const form = document.querySelector("#task-form"); //The form at the top
const form1 = document.querySelector("#labratory-form"); 
const taskInput = document.querySelector("#task"); //the task input text field
const labInput = document.querySelector("#lab");
const labInput1 = document.querySelector("#labre");
const labInput2 = document.querySelector("#lab_Text_Field");
const labBtn = document.querySelector("#lab_btn");
const taskList = document.querySelector(".collection");
const labYes = document.querySelector("#labYes");


//read from q string
const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get("id"));
const idd = Number(urlParams.get("idd"));
const fName = Number(urlParams.get("fullName"));
const dBirth = Number(urlParams.get("birth"));
const dAddress = Number(urlParams.get("address"));
const dName = Number(urlParams.get("doctor"));
const pNumber = Number(urlParams.get("phone"));

//DB
var DB;
console.log(idd);
console.log(id);

// Add Event Listener [on Load]
document.addEventListener("DOMContentLoaded", () => {
  // create the database
  let TasksDB = indexedDB.open("Hospital", 3);

  // if there's an error
  TasksDB.onerror = function () {
    console.log("There was an error");
  };
  // if everything is fine, assign the result to the instance
  TasksDB.onsuccess = function () {
    // console.log('Database Ready');

    // save the result
    DB = TasksDB.result;

    displayTask();
   
 
  };

  form.addEventListener("submit", updateTask);





  function updateTask(e) {
    e.preventDefault();
    console.log(id);

    if (taskInput.value === "") {
      taskInput.style.borderColor = "red";

      return;
    }

    let transaction = DB.transaction(["tasks"], "readwrite");
    var objectStore = transaction.objectStore("tasks");
    var request = objectStore.get(id);



    request.onsuccess = function (e) {
      e = e.target.result;
      console.log(e);

      let editedTask = {
        id: id,
        fullName : e.fullName,
        date : e.date,
        birth: e.birth,
        address :  e.address,
        doctor : e.doctor,
        phone : e.phone,
        symptom : e.symptom,
        dOpinion : taskInput.value,
        uName : e.uName,
        password : e.password,
        status : "seen",
        acceptance: "pending"
     
      };

      var store = objectStore.put(editedTask);
      store.onsuccess = function (e) {
        console.log("Success in updating record");
       
        form.reset();
        // history.back();
      };
    };
  }



  function rejuct(id){
    let transaction = DB.transaction(["tasks"], "readwrite");
    var objectStore = transaction.objectStore("tasks");
    var request = objectStore.get(id);
    request.onsuccess = function (e) {
      e = e.target.result;
      console.log(e);
   
      let editedTask = {
        id: id,
        fullName : e.fullName,
        date : e.date,
        birth: e.birth,
        address :  e.address,
        doctor : e.doctor,
        phone : e.phone,
        symptom : e.symptom,
        dOpinion : e.dOpinion,
        uName : e.uName,
        password : e.password,
        status : e.status,
        acceptance: "rejected"
      };
   
      var store = objectStore.put(editedTask);
      store.onsuccess = function (e) {
        console.log("Success in updating record");
        window.location.reload()
       
   }
   }
   }
  


      function addLab(e) {
        e.preventDefault();
        let labDb = indexedDB.open("Hospital", 3);
       
        

        
        labDb.onsuccess = function(event){
          console.log("kkk")
            
          DB2 = event.target.result
          console.log(DB2);
          var transaction = DB.transaction(["tasks"],"readwrite");
          var objectStore = transaction.objectStore("tasks");
          var req = objectStore.get(id);

          req.onsuccess = function (e) {
            e = e.target.result;
            console.log(e);
      
            let editedTask = {
              id: id,
              fullName : e.fullName,
              date : e.date,
              birth: e.birth,
              address :  e.address,
              doctor : e.doctor,
              phone : e.phone,
              symptom : e.symptom,
              dOpinion : taskInput.value,
              status : "pending",
              uName : e.uName,
              password : e.password,
              acceptance: "pending"
           
            };
      
            var store = objectStore.put(editedTask);
            store.onsuccess = function (e) {
              console.log("Success in updating record");
              alert("Updated Succesfully!");
              
              form.reset();
            };
            let newTask = { 
              fullName: req.result.fullName, date: new Date(), test: labInput2.value,labResult: " ",labStatus : "pending"
            };
            let ltransaction = DB2.transaction(["laboratory"], "readwrite");
            let lobjectStore = ltransaction.objectStore("laboratory");
            let lrequest = lobjectStore.add(newTask);
            lrequest.onsuccess = () => {
                  form1.reset();
                };
            ltransaction.oncomplete = () => {
                console.log("New appointment added");
                };
            ltransaction.onerror = () => {
                console.log("There was an error, try again!");
               }

          }
          




          }
        }}
          
          
          
          
          
          
        
          

 );