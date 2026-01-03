const angka1 = document.getElementById('angka1')
const angka2 = document.getElementById('angka2')
// const angka3 = document.getElementById('angka3')
const operator1 = document.getElementById('operator1')
// const operator2 = document.getElementById('operator2')
let inputan = document.getElementById('input')
const btn = document.getElementById('btn')
const form = document.getElementById('form')

form.addEventListener('submit', function(event) {
    event.preventDefault()
    const nilai1 = parseFloat(angka1.value)
    const nilai2 = parseFloat(angka2.value)
    let hasil = operator1.value == "+" ? nilai1 + nilai2 : nilai1-nilai2
    hasil = operator1.value == "*" ? nilai1 * nilai2 : hasil
    hasil = operator1.value == "/" ? nilai1 / nilai2 : hasil
    hasil = operator1.value == "**" ? nilai1 ** nilai2 : hasil
    hasil = operator1.value =="√" ?  Math.pow(nilai1, 1/nilai2)  : hasil

    inputan.innerText = "Hasil: " + hasil
}) 


