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
console.log(id)

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

    // display the Task
    displayTask();
    //send_to_labratory();
 
  };

  form.addEventListener("submit", updateTask);





  function updateTask(e) {
    e.preventDefault();
    console.log(id);

    // Check empty entry
    if (taskInput.value === "") {
      taskInput.style.borderColor = "red";

      return;
    }

    /* 
        Instruction set to handle Update

        1. Declare the transaction and object store objects 
        2. Use the id on put method of index db
        
        */
    let transaction = DB.transaction(["tasks"], "readwrite");
    var objectStore = transaction.objectStore("tasks");
    var request = objectStore.get(id);


    // objectStore.createIndex("fullName", "fullName");
    // objectStore.createIndex("birth", "birth");
    // objectStore.createIndex("address", "address");
    // objectStore.createIndex("doctor", "doctor");
    // objectStore.createIndex("phone", "phone");
    // objectStore.createIndex("dOpinion", "dOpinion");


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
        symtom : e.symptom,
        dOpinion : taskInput.value,
        uName : e.uName,
        password : e.password,
        status : "seen",
        acceptance: "accepted"
     
      };

      var store = objectStore.put(editedTask);
      store.onsuccess = function (e) {
        console.log("Success in updating record");
       
        form.reset();
        // history.back();
      };
    };
  }



  if(form1){
    form1.addEventListener("submit", addLab);
    
  }







  // function labneeded(e) {
  //   let DB2;
  //   console.log(DB)
  //   e.preventDefault();
  //   let labDb = indexedDB.open("tasks", 2);
       
        

        
  //   labDb.onsuccess = function(event){
  //     console.log("kkk")
        
  //     DB2 = event.target.result
  //     console.log(DB2);
  //     let transa = DB.transaction(["tasks"]);
  //     let objectStore = transa.objectStore("tasks");
  //     let req = objectStore.get(id);
  //     console.log(req.value.fullName);

  

  //     req.onsuccess = function(event){
  //       let newTask = { 
  //         fullName: req.result.fullName, date: new Date(),
  //       };
  //       console.log(req.result);

  //       let transaction = DB2.transaction(["laboratory"], "readwrite");
  //       let objectStore = transaction.objectStore("laboratory");
  //       let request = objectStore.add(newTask);
  //       request.onsuccess = () => {
  //         form.reset();
  //       };
  //       transaction.oncomplete = () => {
  //         console.log("New appointment added");
  //       };
  //       transaction.onerror = () => {
  //         console.log("There was an error, try again!");
  //       }
  //     }}}




  function displayTask() {
    
    var transaction = DB.transaction(["tasks"]);
    var objectStore = transaction.objectStore("tasks");
    var request = objectStore.get(id);
    

    request.onsuccess = function (event) {
      if (request.result) {
        document.getElementById("p1").innerHTML = "Full Name : " + request.result.fullName;
        document.getElementById("p2").innerHTML = "Birth Date : " + request.result.birth;
        document.getElementById("p3").innerHTML = "Address : " + request.result.address;
        document.getElementById("p4").innerHTML = "Phone Number : " + request.result.phone;
        document.getElementById("p5").innerHTML = "symptom : " + request.result.symptom;
        

      } else {
        console.log("No data record");
      }
    };

    request.onerror = function (event) {
      console.log("Transaction failed");
    };
    
    
    var labTransaction = DB.transaction(["laboratory"]);
    var labObjectStore = labTransaction.objectStore("laboratory");
    var labRequest = labObjectStore.get(id);

    labRequest.onsuccess = function (event) {
      if (labRequest.result) {
        document.getElementById("p6").innerHTML = "Labratory Result : " + labRequest.result.labResult;
        
        

      } else {
        console.log("No data record");
      }
    };

    request.onerror = function (event) {
      console.log("Transaction failed");
    }; 




  }
  


//   function send_to_labratory() {
//     console.log(DB)
//     console.log(DB)
//     let DB2;
  
//     // clear the previous task list
//     var transaction = DB.transaction(["tasks"]);
//     var objectStore = transaction.objectStore("tasks");
//     var request = objectStore.get(id);
    
    
//     request.onsuccess = function (event) {
//       console.log(request.result.labratory)
      
//       if ((request.result.labratory) == "yes") {
        
        
//         // let labDb = indexedDB.open("tasks", 2);
        

        
//         // labDb.onsuccess = function(event){
//         //   console.log("kkk")
            
//         //   DB2 = event.target.result
//         //   console.log(DB2);
          
          
//         // }
//         // labDb.onupgradeneeded = function(){
//         //   console.log("nm")
//         //   sto = labDb.createObjectStore("lab_table", {
//         //     keyPath: "id",
//         //     autoIncrement: true,
            
//         //   });
//         //   objectStore.createIndex("fullName", "fullName");

//         // }       
        
        
        

//       };
      //labBtn.addEventListener("click", addLab);
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
              symtom : e.symptom,
              dOpinion : taskInput.value,
              status : "pending",
              uName : e.uName,
              password : e.password,
              acceptance: "accepted"
           
            };
      
            var store = objectStore.put(editedTask);
            store.onsuccess = function (e) {
              console.log("Success in updating record");
              alert("Updated Succesfully!");
              // history.back();
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
          

          // req.onsuccess = function(event){
            
            
          //   console.log(req.result);
    
          //   let transaction = DB2.transaction(["laboratory"], "readwrite");
          //   let objectStore = transaction.objectStore("laboratory");
          //   let request = objectStore.add(newTask);
          //   request.onsuccess = () => {
          //     form.reset();
          //   };
          //   transaction.oncomplete = () => {
          //     console.log("New appointment added");
          //   };
          //   transaction.onerror = () => {
          //     console.log("There was an error, try again!");
          //  }}}}}
        
        
        
        
        
        
        
        
        
        //the rest of code
          // var transaction = DB.transaction(["tasks"],"readwrite");
          // var objectStore = transaction.objectStore("tasks");
          // var req = objectStore.get(id);
          // console.log(req)
          

          // req.onsuccess = function(e){

          //   e = e.target.result;

          //   let editedTa = {
          //     id: id,
          //     fullName : e.fullName,
          //     date : e.date,
          //     birth: e.birth,
          //     address :  e.address,
          //     doctor : e.doctor,
          //     phone : e.phone,
          //     symtom : e.symptom,
          //     dOpinion : taskInput.value,
          //     status : "pending"
          
          //   };
      
          //   var store = objectStore.put(editedTa);
          //   store.onsuccess = function (e) {
          //     console.log("Success in updating record");
          //     alert("Updated Succesfully!");
          //     // history.back();
          //   };}
          //   transaction.oncomplete = () => {
          //     console.log("New appointment added");
          //   };
          //   transaction.onerror = () => {
          //     console.log("There was an error, try again!");
          //  }





          //  let ltransaction = DB.transaction(["laboratory"], "readwrite");
          //  let lobjectStore = ltransaction.objectStore("laboratory");
          //  let lrequest = lobjectStore.get(idd);
          //  console.log(lrequest)
          //  lrequest.onsuccess = function(e){
          //   d = e.target.result;
          //   console.log(d)
          //   let newTask = { 
              
          //     fullName: e.fullName, date: e.date, test: labInput2.value,labResult: " "
          //   };
          //   let quest = lobjectStore.add(newTask);
          //   quest.onsuccess = function (e) {
          //     form.reset();
          //   };
          //   ltransaction.oncomplete = () => {
          //     console.log("New appointment added");
          //   };
          //   ltransaction.onerror = () => {
          //     console.log("There was an error, try again!");
          //  }
          //     //form.reset();

          //   };




          
              
            
    





            // let transaction = DB2.transaction(["laboratory"], "readwrite");
            // let objectStore = transaction.objectStore("laboratory");
            // let request = objectStore.add(newTask);
            
            








          }
        }}
          
          
          
          
          
          
        
          

 );