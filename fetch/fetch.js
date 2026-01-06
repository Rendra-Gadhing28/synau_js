const inp = document.querySelectorAll('input');
const btn = document.getElementById('btn');
const select = document.getElementsById('tech')


inp.addEventListener('input', ()=>{
    preventDefault();
    inp.style.border = "2px solid green";
})
btn.addEventListener('click', ()=>{
    preventDefault();
    const data ={
        'username' : inp[0].value.trim(),
        'password' : inp[1].value.trim()
    }
    const req = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        , body : JSON.stringify(data)
        }
    }

    fetch('progres.php', req)
    .then(response => response.json())
    console.alert(data);
})