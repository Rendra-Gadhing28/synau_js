

const tgs=document.querySelector('input')
const task = document.getElementById('task')
const button = document.getElementById('button')
let nampung = []

button.addEventListener('click', function(){
    let newtask = tgs.value.trim();
    nampung.push(newtask)
    tgs.value = ''; 
   
   
    const render = ()=>{
        task.textContent = '';
        nampung.forEach(nampung =>{
            const li = document.createElement('li');
            li.textContent = nampung;
            task.appendChild(li)
        } )
    }
    render()
 
})


// const render = () => {
