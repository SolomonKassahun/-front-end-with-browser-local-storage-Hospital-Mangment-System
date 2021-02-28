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


document.addEventListener("DOMContentLoaded", () => {
  let TasksDB = indexedDB.open("Hospital", 3);
  TasksDB.onerror = function () {
    console.log("There was an error");
  };
  
  TasksDB.onsuccess = function () {
    
    DB = TasksDB.result;

    displayTask();
    
 
  };

  function displayTask() {
    var idmain;
    
    var transaction = DB.transaction(["tasks"]);
    var objectStore = transaction.objectStore("tasks");
    var request = objectStore.get(id);
    

    request.onsuccess = function (event) {
      if (request.result) {
        idmain = request.result.fullName;
        document.getElementById("p1").innerHTML = "Full Name : " + request.result.fullName;
        document.getElementById("p2").innerHTML = "Birth Date : " + request.result.birth;
        document.getElementById("p3").innerHTML = "Address : " + request.result.address;
        document.getElementById("p4").innerHTML = "Phone Number : " + request.result.phone;
        document.getElementById("p5").innerHTML = "symptom : " + request.result.symptom;
        var labTransaction = DB.transaction(["laboratory"]);
        var labObjectStore = labTransaction.objectStore("laboratory");
        var labRequest = labObjectStore.get(idmain);

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
        

      } else {
        console.log("No data record");
      }
    };

    request.onerror = function (event) {
      console.log("Transaction failed");
    }; 




  }
  
  





}
          
          
          
          
          
          
        
          

 );