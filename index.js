import  Express from 'express'
const app = Express()
import cors from 'cors'

import multer from 'multer'
import path from 'path'

let data = new Date().getTime()

const port = process.env.PORT || 3001

const url = 'mongodb+srv://dados:ZeOWIzee7yBJOEp9@cluster0.f1egadi.mongodb.net/?retryWrites=true&w=majority'
import mongoose from 'mongoose'

mongoose.connect(url).then(()=>console.log('Mongoose conectou'))
.catch(()=>console.log('Mongoose não conectou'))

import User from './user.js'

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, path.resolve('./uploads/imgs/'))
    },
    filename: async (req, file, callback)=>{
        let nameImg2 = `${data}_${file.originalname}`
        callback(null, nameImg2)
    }
})
const upload = multer({storage: storage})

app.use(cors())
app.use(Express.json())
app.post('/register', upload.single('file'), async (req, res)=>{
    const {nome} = req.body
    const {cep} = req.body
    const {telefone} = req.body
    const {endereco} = req.body
    const {estado} = req.body
    const {categoria} = req.body
    const {imgName} = req.body
    //let nameImg2 = `${nameImg}${imgName}`
    //let SQL = "insert into parceiros (nome,cep,telefone,endereco,estado,categoria, img) values (?, ?, ?, ?, ?, ?, ?);"
    //db.query(SQL, [nome, cep, telefone, endereco, estado, categoria, nameImg2] ,(ERRO, result)=>{
    //    console.log(ERRO)
    //})

    const img2 =`${data}_${imgName}`
    const obj = {
        nome:nome,
        cep: cep,
        telefone: telefone,
        endereco: endereco,
        estado: estado,
        categoria: categoria,
        img: img2
    }


    const newUser = User.create(obj)
    return res.json(newUser)
})
app.get('/getSQL', async (req, res)=>{
    const parceiros = await User.find()
    return res.json(parceiros)
})

const serverFun = () =>{
    console.log('server rodando')
}
app.listen(port, serverFun)