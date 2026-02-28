

class Todolist{

    static semuaList= [];
   constructor(kegiatanId, tenggatId, kategoriId) {
        // Simpan ID untuk referensi
        this.kegiatanId = kegiatanId;
        this.tenggatId = tenggatId;
        this.kategoriId = kategoriId;
        
        // Ambil nilai dari input
        this.kegiatan = document.getElementById(kegiatanId).value;
        this.tenggat = document.getElementById(tenggatId).value;
        this.kategori = document.getElementById(kategoriId).value;

   }

    getcurrentTime(){
        return new Date()
    }

    hitungTenggat(){
        if(!this.tenggat){
            return null
        }
        //membuat tanggal tenggat baru
        let tenggat = new Date(this.tenggat)
        //panggil function get current time
        const sekarang = this.getcurrentTime()
        //set hours semuanya menjadi sama
        const tanggalTenggat = tenggat.setHours(0,0,0,0)
        const saiki = sekarang.setHours(0,0,0,0)
        //kurangi selisih dari tenggat - saiki
        const selisih = tanggalTenggat - saiki
        //hitung sisa hari menggunakan Math Ceil
        const sisaHari = Math.ceil(selisih / (1000 * 60 * 60 * 24))
        console.log(`berhasil menghitung sisa hari, ${sisaHari}`)
        return sisaHari
    }

     clearInputFields() {
        document.getElementById(this.kegiatanId).value = '';
        document.getElementById(this.tenggatId).value = '';
        document.getElementById(this.kategoriId).value = '';
    }

    static clearInput(){
        Todolist.semuaList = []
        const ul = document.getElementById('hasil')

        if(ul) ul.innerHTML = ''
        console.log(ul.innerHTML, 'berhasil di clear')
    }

    getSisaHari(){
        const hari = this.hitungTenggat()
        if (hari === null) return "⏰ Tentukan tenggat dulu";
        switch(true) {
            case (hari > 0 ):
                console.log('tersisa beberapa hari')
                return `tersisa : ${hari} hari`
            case (hari === 0):
                console.log('hari ini')
                return `tersisa : ${hari}, jangan lupa hari ini!`
            default:
                console.log('task sudah terlewatkan')
                return `terlewat ${Math.abs(hari)} hari`
        }
    }

    addList(){

        if(!this.kegiatan || !this.tenggat) return alert("harap isi kegiatan dan tanggal terlebih dahulu");


        const list = {
            "id" : Date.now(),
            'tanggalAsli':this.tenggat,
            "kegiatan" : this.kegiatan,
            "tenggat" : this.hitungTenggat(),
            "sisahari":this.getSisaHari(),
            "kategori" : this.kategori,
        }
        console.log(`Task berhasil dimuat ${list}`)
        const mp = [list.id,
            list.tanggalAsli,
            list.kegiatan,
            list.tenggat,
            list.sisahari,
            list.kategori
        ]

        console.table(mp)
        
        Todolist.semuaList.push(list)
        //kemudian render
        this.render()
        console.log('list sudah masuk ke dalam array')

        this.clearInputFields()
    }

     render(){
            const ul = document.getElementById('hasil')
            ul.innerHTML = ""

            Todolist.semuaList.forEach((e)=>{
                const create = document.createElement('li')

                let bgcolor = 'bg-gray-40'
                let ccolor = 'text-gray-400'

                if(e.sisaHari <= 0){
                    bgcolor = 'bg-red-50'
                    ccolor = 'text-red-400'
                }

                else if(e.sisaHari > 3){
                    bgcolor = 'bg-text-green-50'
                    ccolor = 'text-green-400'
                }

                
                create.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-lg text-white">${e.kegiatan}</h3>
                        <p class="text-sm text-gray-400 mt-1">📅 Tenggat: ${e.tanggalAsli}</p>
                        <p class="text-sm font-medium mt-1 $">Tersisa : ${e.tenggat}</p>
                    </div>
                    <div>
                        <span class="px-3 py-1 bg-white/80 text-black rounded-full text-xs">
                            ${e.kategori || 'Tanpa Kategori'}
                        </span>
                    </div>
                </div>`
                ul.appendChild(create)


            })
        }
}

const kegiatan = document.getElementById('kegiatan').value
const tenggat = document.getElementById('tenggat').value
const kategori = document.getElementById('kategori').value
const kirim = document.getElementById('send')
const clearInput = document.getElementById('clear')
const ul = document.getElementById('hasil')
//membuat list baru aku masih bingung create element tu di dalam class atau di dalam addEventListner
kirim.addEventListener('click',()=>{
    const todo = new Todolist('kegiatan', 'tenggat', 'kategori')
    todo.addList()
})

clearInput.addEventListener('click', ()=>{
    const objectTemp = new Todolist('kegiatan', 'tenggat', 'kategori')
    objectTemp.clearInputFields()
})

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const todo = new Todolist('kegiatan', 'tenggat', 'kategori');
        todo.addList();
    }   
});