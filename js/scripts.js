if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

const {log} = console;

function ready(){

    const calcBtn = document.getElementsByClassName('calc-btn')[0]
        calcBtn.addEventListener('click', calculateWeight)
        AsyncAwaitUsers()
}

// using promises
function fetchUsers(){
    const url = 'https://jsonplaceholder.typicode.com/users'
    fetch(url).then((response)=> response.json()).then((data)=> {
      localStorage.setItem('users', JSON.stringify(data))
    }).catch(err =>log(err))
}

// using asyn await
async function AsyncAwaitUsers(){
    const url = 'https://jsonplaceholder.typicode.com/users'
    try{
        const response = await fetch(url);
        const users = await response.json()
        log(users)
        localStorage.setItem('users', JSON.stringify(users))
    }catch(err){
        log(err)
    }
}


const planets = [
    {
        name:'Earth',
        gravity: 9.8
    },
    {
        name:'Mercury',
        gravity: 3.61
    },
    {
        name:'Venus',
        gravity: 8.83
    },
    {
        name:'Mars',
        gravity: 3.75
    },
    {
        name:'Jupiter',
        gravity: 26.0
    },
    {
        name:'Saturn',
        gravity: 11.2
    },
    {
        name:'Uranus',
        gravity: 10.5
    },
    {
        name:'Neptune',
        gravity: 13.3
    },
    {
        name:'Pluto',
        gravity: 0.61
    },
    {
        name:'Moon',
        gravity:1.62
    }
]

function login(){
    const users = getUsers()
 
    // users.forEach((user,i) =>{

    // })
}

function getUsers(){
    let users = localStorage.getItem('users');
    if(!users){
        users = []
    }else{
        users = JSON.parse(users)
}
return users
}

function calculateWeight(e){
   const mass = Number(document.getElementsByClassName('mass')[0].value)
   const planet = document.getElementsByClassName('planet')[0].value
   if(!mass || !planet || isNaN(mass)){
    //    alert('Mass is required, Pls enter a valid number')
    alertMessage('Mass is required, Pls enter a valid number', 'danger')
       return;
   }
  // search
  const result = search(planets, planet)
  if(!result){
      alert('Planet not found')
      return
  }else{
      let weightOfObject = mass * parseFloat(result.gravity)
       weightOfObject = weightOfObject.toFixed(2)
      const outputResult = document.getElementsByClassName('output-result')[0]
            outputContent = `
            <p>The weight of the object on <b>${planet.toUpperCase()}</b></p>
            <div class="output-value">
                <span>${weightOfObject}N</span>
            </div>
            `
        outputResult.innerHTML = outputContent

        alertMessage('Successful', 'success')
  }
}

function search(planets, planet){
    for(let i=0; i< planets.length; i++){
        const p = planets[i]
        if(p.name.toLowerCase() == planet.toLowerCase()){
            return planets[i]
        }
    }
    return null
}

function alertMessage(message, className){
    const div = document.createElement('div')
          div.className = `alert alert-${className}`
          const txt = document.createTextNode(message)
          div.appendChild(txt)

          const container = document.getElementsByClassName('calculator-screen')[0]
          const calculatorScreen = document.getElementsByClassName('calculator-screen-output')[0]
          container.insertBefore(div, calculatorScreen)

          setTimeout(()=>{
            document.getElementsByClassName('alert')[0].remove()
          }, 3000)
}

