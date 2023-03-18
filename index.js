import  Express from 'express'
import User from './user.js'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'

const app = Express()
const port = process.env.PORT || 3001

let data = new Date().getTime()

const url = 'mongodb+srv://dados:ZeOWIzee7yBJOEp9@cluster0.f1egadi.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url).then(()=>console.log('Mongoose conectou'))
.catch(()=>console.log('Mongoose não conectou'))


const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, path.resolve('imgs'))
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
app.get('/', (req, res)=>{
    const mensagem = 'Hello World2'
    return res.json(mensagem)
})

const serverFun = () =>{
    console.log('server rodando')
}
app.listen(port, serverFun)