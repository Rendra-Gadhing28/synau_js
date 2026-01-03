
const pekerjaan = ['programmer', 'designer' , 'manager']
const token = Math.floor(Math.random() * 123456)

async function login(nama,callback) {
    console.log('progress nama...')
    return new Promise((succes,failed)=>{
        setTimeout(()=>{
            if(nama)
                succes(callback({nama,token}));
            else
                failed(new console.error("maaf anda gagal login"));
        },200)
    })
    }
       
async function getUser(token,callback){
    console.log('prosesing token...')
    return new Promise((succes,failed)=>{
        setTimeout(()=>{
            if(token)
            succes(callback({apiKey : 'qwertzy'}))
        else failed(new console.error("token tidak valid"));
        },200)
    })
    }


async function getPekerjaan(apiKey,callback){
    console.log('procesing pekerjaan...')
    return new Promise((succes, failed)=>{
        setTimeout(()=>{
            if(apiKey)
                succes(callback({pekerjaan}))
        },500)

    })
}


login("Rendra Gadhing", async (response)=>{

    const {nama, token} = response
    console.log(nama)

    const tkn = await getUser(token, async (response)=>{
        console.log(token)
        const { apiKey } = response
        console.log(`apiKey diterima : ${apiKey}`)
        const pkr = await getPekerjaan(apiKey, async (response)=>{
            const { pekerjaan } = response
            console.log(pekerjaan)
        })
    })
}
)