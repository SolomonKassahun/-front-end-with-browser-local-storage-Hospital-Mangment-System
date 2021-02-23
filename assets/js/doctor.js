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
const patintList = document.querySelector('.pList')
const tableR = patintList.getElementsByTagName('tr')

let DB;
document.addEventListener('DOMContentLoaded',()=>{
    let patientDB = indexedDB.open('hospital',1)

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
        let objectStore = db.createObjectStore('hospital',{keyPath:'id',autoIncrement:true})
        objectStore.createIndex('hms','hms',{unique:false})
        console.log('database reafg')
    }
    function DisplayPatient(){
        
        while(patintList.firstChild){
            patintList.removeChild(patintList.firstChild)
        }
        let objectStore = DB.transaction('hospital').objectStore('hospital')
        objectStore.openCursor().onsuccess = function(e){
            let cursor = e.target.result

            if(cursor){
                const tr = document.createElement('tr')
                tr.setAttribute('data-patient-id',cursor.value.id)
                tr.className = 'pInformation'
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')
                const td4 = document.createElement('td')
                const td5 = document.createElement('td')
                const td6 = document.createElement('td')
                
                const link = document.createElement('a')
                link.className = 'remove-item'
                link.innerHTML = '<i class="fas fa-trash"></i>'
                td6.innerHTML = `<a href="patient.html?id=${cursor.value.id}"><i class="fas fa-edit"></i></a>`
                td5.appendChild(link)
                td1.appendChild(document.createTextNode(cursor.value.fname + " " + cursor.value.fname))
                td2.appendChild(document.createTextNode(cursor.value.age))
                td3.appendChild(document.createTextNode(cursor.value.sex))
                td4.appendChild(document.createTextNode(cursor.value.state))

                tr.append(td1,td2,td3,td4,td5,td6)
                patintList.appendChild(tr)
                cursor.continue()
                
            }
        }
    }
    function displayProfile(){
        var transaction = DB.transaction(['hospital'])
        var objectStore = transaction.objectStore('hospital')
        var request = objectStore.get(id)

        request.onsuccess = function(event){
            if(request.result){
                firsName.textContent = request.result.fname

            }
        }
    }
    

    
})














