

class Todolist{

    static semuaList= [];
    static STORAGE_KEY = 'list_kegiatan'
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

   tandaiSelesai(){
    this.selesai = !this.selesai
    return this.simpan()
   }

   static ambilSemuadata(){
    const data = localStorage.getItem(Todolist.STORAGE_KEY)
    return data ? JSON.parse(data) : []

   }

    getcurrentTime(){
        return new Date()
    }

    simpan(){
         const skegiatan =Todolist.ambilSemuadata()
         const index = skegiatan.findIndex(k => k.id === this.id)

         if(index !== -1){
            skegiatan[index] = this.toJson()
         } else {
            skegiatan.push(this.toJson())
         }
         localStorage.setItem(Todolist.STORAGE_KEY, JSON.stringify(skegiatan))
         return this;
    }

    toJson(){
        return {
            id : this.id,
            tanggalAsli : this.tenggat,
            kegiatan : this.kegiatan,
            tenggat : this.hitungTenggat(),
            sisaHari : this.getSisaHari(),
            kategori : this.kategori
        }
    }

    statusText(){
        const status = this.getStatus()
        const sisa = this.hitungTenggat()
        const statusMap = {
            'selesai': '✅ Selesai',
            'terlewat': `❌ Terlewat ${Math.abs(sisa)} hari`,
            'hari-ini': '⚡ Hari ini!',
            'mepet': `⚠️ Sisa ${sisa} hari`,
            'aman': `✅ Sisa ${sisa} hari`
        };
        
        return statusMap[status];
    }

    getWarna(){
        const status = this.getStatus()
        const warnaMap = {
            'selesai': 'bg-green-100 border-green-300',
            'terlewat': 'bg-red-100 border-red-300',
            'hari-ini': 'bg-orange-100 border-orange-300',
            'mepet': 'bg-yellow-100 border-yellow-300',
            'aman': 'bg-blue-100 border-blue-300'
        };
        
        return warnaMap[status];
    }

    getStatus(){
        if(this.selesai) return 'selesai'

        const sisa = this.hitungTenggat()
        if(sisa < 0) return 'terlewat'
        else if(sisa === 0) return 'hari ini'
        else if(sisa <= 3) return 'mepet'
        return 'aman'
    }
    

    static dariJSON(json){
        const list = new Object.create(Todolist.prototype)
        list.id = json.id
        list.kegiatan = json.kegiatan;
        list.tenggat = json.tenggat;
        list.kategori = json.kategori;
        list.dibuat = json.dibuat
        list.selesai = json.selesai
        return list
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
            case (hari > 3 ):
                console.log('tersisa beberapa hari')
                return `tersisa : ${hari} hari`
            case (hari > 0 ):
                console.log('jangan lupa hari ini, segera dikerjakan!')
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


        this.id = Date.now() + Math.random()
        // const list = {
        //     "id" : Date.now() + Math.random(),
        //     'tanggalAsli':this.tenggat,
        //     "kegiatan" : this.kegiatan,
        //     "tenggat" : this.hitungTenggat(),
        //     "sisahari":this.getSisaHari(),
        //     "kategori" : this.kategori,
        // }

        console.log(`TaskId berhasil dimuat ${this.id}`)
        // const mp = [list.id,
        //     list.tanggalAsli,
        //     list.kegiatan,
        //     list.tenggat,
        //     list.sisahari,
        //     list.kategori
        // ]

        // console.table(mp)
        
        // Todolist.semuaList.push(list)
        //simpan ke dalam local storage
        console.log('data berhasil disimpan di Storage')
        this.simpan()
        //memuat storage
        console.log('memuat storage...')
        Todolist.muatStorage()
        console.log('list sudah masuk ke dalam array')

        this.clearInputFields()

        return true
    }

    static muatStorage(){
        const data = Todolist.ambilSemuadata()
        Todolist.semuaList = data
        Todolist.render()
    }

     static render(){
            const ul = document.getElementById('hasil')
            ul.innerHTML = ""

            Todolist.semuaList.forEach((e)=>{
                const create = document.createElement('li')
                create.className = "p-4 mb-3 rounded-lg border bg-gray-800";
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
                    <div class="flex flex-col gap-2 items-end">
                        <span class="px-3 py-1 bg-white/80 text-black rounded-full text-xs">
                            ${e.kategori || 'Tanpa Kategori'}
                        </span>
                        <button onClick="Todolist.hapus('${e.id}')"
                        class="text-xs text-red-400 hover:text-red-600">
                         🗑 Hapus
                         </button>
                    </div>
                </div>`
                ul.appendChild(create)


            })
        }
        static hapus(id){
            let data = Todolist.ambilSemuadata();
            console.table(data)

            data = data.filter(i => i.id != id);
            console.log(`menghapus listId : ${id}`)

            localStorage.setItem(Todolist.STORAGE_KEY, JSON.stringify(data))
            Todolist.muatStorage()
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

document.addEventListener('DOMContentLoaded', ()=>{
    Todolist.muatStorage()
})