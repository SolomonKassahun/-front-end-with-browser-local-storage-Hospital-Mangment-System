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

const idd = Number(urlParams.get("idd"));
const fName = Number(urlParams.get("fullName"));
const dBirth = Number(urlParams.get("birth"));
const dAddress = Number(urlParams.get("address"));
const dName = Number(urlParams.get("doctor"));
const pNumber = Number(urlParams.get("phone"));


var DB;

document.addEventListener("DOMContentLoaded", () => {

  let TasksDB = indexedDB.open("Hospital", 3);


  TasksDB.onerror = function () {
    console.log("There was an error");
  };

  TasksDB.onsuccess = function () {

    DB = TasksDB.result;

 
    displayTask();

 
  };

  form.addEventListener("submit", updateTask);





  function updateTask(e) {
    e.preventDefault();
    console.log(idd);

    // Check empty entry
    if (taskInput.value === "") {
      taskInput.style.borderColor = "red";

      return;
    }


    let transaction = DB.transaction(["laboratory"], "readwrite");
    var objectStore = transaction.objectStore("laboratory");
    var request = objectStore.get(idd);





    request.onsuccess = function (e) {
      e = e.target.result;
      console.log(e);

      let editedTask = {
        idd: idd,
        fullName :  e.fullName,
        date : e.date,
        test : e.test,
        labResult : taskInput.value,
        labStatus : "Done",
        
     
      };

      var store = objectStore.put(editedTask);
      store.onsuccess = function (e) {
        console.log("Success in updating record");
        form.reset();
        
      };
    };
    
  }



  if(form1){
    form1.addEventListener("submit", addLab);
    
  }







  
      function addLab(e) {
        e.preventDefault(); //the rest of code
        let labDb = indexedDB.open("Hospital", 3);
       
        

        
        labDb.onsuccess = function(event){
          console.log("kkk")
            
          DB2 = event.target.result
          console.log(DB2);
          var transaction = DB.transaction(["tasks"]);
          var objectStore = transaction.objectStore("tasks");
          var req = objectStore.get(id);
          

          req.onsuccess = function(event){
            
            let newTask = { 
              fullName: req.result.fullName, date: new Date(), test: labInput2.value
            };
            console.log(req.result);
    
            let transaction = DB2.transaction(["laboratory"], "readwrite");
            let objectStore = transaction.objectStore("laboratory");
            let request = objectStore.add(newTask);
            request.onsuccess = () => {
              form.reset();
            };
            transaction.oncomplete = () => {
              console.log("New appointment added");
            };
            transaction.onerror = () => {
              console.log("There was an error, try again!");
           }}}}}

 );