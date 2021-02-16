const inputfName = document.querySelector('#fname')
const inputlName = document.querySelector('#lname')
const inputmName = document.querySelector('#mname')
const inputAddress = document.querySelector('#address')
const inputPhone = document.querySelector('#phoneNo')
const inputsex = document.querySelector('#sex')
const inputAge = document.querySelector('#age')
const inputCity = document.querySelector('#inputCity')
const inputState = document.querySelector('#inputState')
const patientRegisterForm = document.querySelector('#pRegister')

const filter = document.querySelector("#filter"); 
const hList = ""
const patintList = document.querySelector('.pList')
const tableR = patintList.getElementsByTagName('tr')
//const filter = document.getElementById('#filter')

const urlParams = new URLSearchParams(window.location.search);
const docName = urlParams.get("dname");


let DB;
document.addEventListener('DOMContentLoaded',()=>{
    let patientDB = indexedDB.open('Hospital',3)

    patientDB.onerror = function(e){
        console.log('error happen')
    }
    patientDB.onsuccess = function(e){
        console.log('success')
        DB = patientDB.result
        DisplayPatient()
    }
    patientDB.onupgradeneeded = function(e){
        let db = e.target.result
        let objectStore = db.createObjectStore('tasks',{keyPath:'id',autoIncrement:true})
        objectStore.createIndex('hms','hms',{unique:false})
        console.log('database reafg')
    }
    function DisplayPatient(){
        
        while(patintList.firstChild){
            patintList.removeChild(patintList.firstChild)
        }
        let objectStore = DB.transaction('tasks').objectStore('tasks')
        objectStore.openCursor().onsuccess = function(e){
            let cursor = e.target.result
            //console.log(cursor.value.doctor)
            if (cursor){
                if(((cursor.value.doctor) === docName)&&(cursor.value.status != "seen")&&((cursor.value.acceptance) != "rejected")){
                    const tr = document.createElement('tr')
                    tr.setAttribute('data-patient-id',cursor.value.id)
                    tr.className = 'pInformation'
                    const td1 = document.createElement('td')
                    const td2 = document.createElement('td')
                    const td3 = document.createElement('td')
                    const td4 = document.createElement('td')
                  
                    td4.innerHTML = `<Button type="button" class="btn btn-primary" onclick="rejuct(${cursor.value.id})">Reject</Button>`
                    td3.innerHTML = `<a href="edit.html?id=${cursor.value.id}"><i class="fas fa-edit"></i></a>`
                   
                    td1.appendChild(document.createTextNode(cursor.value.fullName))
                    td2.appendChild(document.createTextNode(cursor.value.status))
                    
    
                    tr.append(td1,td2,td3,td4)
                    patintList.appendChild(tr)
                   
                    
                }
                cursor.continue()
            }
            
        
        }
    }
    
    filter.addEventListener('keyup', (e) => {
      const input = e.target.value.toLowerCase();
      const items = patintList.getElementsByTagName('tr');
      for(let i=0;i < tableR.length;i++){
        const val = tableR[i].firstElementChild.textContent
       
        if(val.toLowerCase().indexOf(input) != -1){
          
          tableR[i].style.display = ''
          
        }else{
          tableR[i].style.display = 'none'
         
        }
      }
     
    }); 
    function displayDescendSort() {
      while(patintList.firstChild){
        patintList.removeChild(patintList.firstChild)
      }
      let objectStore = DB.transaction('tasks').objectStore('tasks')
      objectStore.openCursor().onsuccess = function(e){
        let cursor = e.target.result
        if (cursor){
          if(((cursor.value.doctor) === docName)&&((cursor.value.status) != "seen")&&((cursor.value.acceptance) != "rejected")){

              const tr = document.createElement('tr')
              tr.setAttribute('data-patient-id',cursor.value.id)
              tr.className = 'pInformation'
              const td1 = document.createElement('td')
              const td2 = document.createElement('td')
              const td3 = document.createElement('td')
              const td4 = document.createElement('td')
              // const td4 = document.createElement('td')
              // const td5 = document.createElement('td')
              // const td6 = document.createElement('td')
                
                
                //link.className = 'remove-item'
                //link.innerHTML = '<i class="fas fa-trash"></i>'
              td4.innerHTML = `<Button type="button" class="btn btn-primary" onclick="rejuct(${cursor.value.id})">Reject</Button>`
              td3.innerHTML = `<a href="edit.html?id=${cursor.value.id}"><i class="fas fa-edit"></i></a>`
    
              td1.appendChild(document.createTextNode(cursor.value.fullName))
              td2.appendChild(document.createTextNode(cursor.value.status))
              

              tr.append(td1,td2,td3)
              patintList.appendChild(tr)
              cursor.continue()
          }
            
        }
    }
  }
  function displayAscendSort() {
    while(patintList.firstChild){
      patintList.removeChild(patintList.firstChild)
    }
    let objectStore = DB.transaction('tasks').objectStore('tasks')
    objectStore.openCursor().onsuccess = function(e){
      let cursor = e.target.result
      if (cursor){
        if(((cursor.value.doctor) === docName)&&(cursor.value.status != "seen")&&((cursor.value.acceptance) != "rejected")){

            const tr = document.createElement('tr')
            tr.setAttribute('data-patient-id',cursor.value.id)
            tr.className = 'pInformation'
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            
            td4.innerHTML = `<Button type="button" class="btn btn-primary" onclick="rejuct(${cursor.value.id})">Reject</Button>`
            td3.innerHTML = `<a href="edit.html?id=${cursor.value.id}"><i class="fas fa-edit"></i></a>`
            td1.appendChild(document.createTextNode(cursor.value.fullName))
            td2.appendChild(document.createTextNode(cursor.value.status))
            tr.append(td1,td2,td3)
            patintList.insertBefore(tr,patintList.firstChild)
            cursor.continue()
        }
          
      }
  }
}
const ascendingBtn = document.querySelector(".ascending-btn");
const descendingBtn = document.querySelector(".descending-btn");
descendingBtn.addEventListener("click", displayDescendSort);
ascendingBtn.addEventListener("click", displayAscendSort);
  
})


function patientHistory(){
        
  while(patintList.firstChild){
      patintList.removeChild(patintList.firstChild)
  }
  let objectStore = DB.transaction('tasks').objectStore('tasks')
  objectStore.openCursor().onsuccess = function(e){
      let cursor = e.target.result
      if(cursor.value.status == "seen"){
            const tr = document.createElement('tr')
            tr.setAttribute('data-patient-id',cursor.value.id)
            tr.className = 'pInformation'
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            td3.innerHTML = `<a href="doc_result_viewer.html?id=${cursor.value.id}"><i class="fas fa-edit"></i></a>`
          
            td1.appendChild(document.createTextNode(cursor.value.fullName))
            td2.appendChild(document.createTextNode(cursor.value.status))
          
            tr.append(td1,td2,td3)
            patintList.appendChild(tr)            
    }
    cursor.continue()  
    

}}

