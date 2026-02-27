const { createElement } = require("react")

class Todolist{
    constructor(kegiatan, tenggat, kategori){
        this.kegiatan = document.getElementById(kegiatan).value
        this.tenggat = document.getElementById(tenggat).value
        this.kategori = document.getElementById(kategori).value
    }

    getcurrentTime(){
        return new Date()
    }

    hitungTenggat(){
        let tenggat = new Date(this.tenggat) - this.getcurrentTime()
        const sisaHari = Math.ceil(tenggat / (1000 * 60 * 60 * 24))
        return sisaHari
    }

    clearInput(){
        this.kegiatan = ""
        this.tenggat = ""
        this.kategori = ""
    }

    getSisaHari(){
        const hari = this.hitungTenggat()

        switch(true) {
            case (hari > 0 ):
                return `tersisa : ${hari} hari`
            case (hari === 0):
                return `tersisa : ${hari}, jangan lupa hari ini!`
            default:
                return `terlewat ${Math.abs(hari)} hari`
        }
    }

    addList(){
        let semuaList = []
        const list = {
            "kegiatan" : this.kegiatan,
            "tenggat" : this.getSisaHari(),
            "kategori" : this.kategori,
        }
        semuaList = list

        const render = ()=>{
           const create =  createElement('li')
           create.append(semuaList)
        }
        render()
    }
}

const kirim = document.getElementById('send')
const clearInput = document.getElementById('clear')
const ul = document.getElementById('hasil')
const object = new Todolist('kegiatan', 'tenggat', 'kategori')
//membuat list baru aku masih bingung create element tu di dalam class atau di dalam addEventListner
kirim.addEventListener('click',()=>{
    
})

clearInput.addEventListener('click', ()=>{
    object.clearInput
})