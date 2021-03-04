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

  function displayTask() {
    
    var transaction = DB.transaction(["tasks"]);
    var objectStore = transaction.objectStore("tasks");
    var request = objectStore.get(id);
    

    request.onsuccess = function (event) {
      if (request.result) {
        document.getElementById("p1").innerHTML = "Full Name : " + request.result.fullName;
        document.getElementById("p2").innerHTML = "You result : " + request.result.dOpinion;
        document.getElementById("p3").innerHTML = "Acceptance : " + request.result.acceptance;

        if(request.result.acceptance == "rejected")
        {
          document.getElementById("p4").innerHTML = "You are rejected because There are above maximum number of patients please re appoint again" 

        }
        

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




  }}          
        
          

 );