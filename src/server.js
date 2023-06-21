import Express from 'express'
import User from './user.js'
import cors from 'cors'
import mongoose from 'mongoose'

const app = Express()

const url = 'mongodb+srv://dados:ZeOWIzee7yBJOEp9@cluster0.f1egadi.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url).then(()=>console.log('Mongoose conectou'))
.catch(()=>console.log('Mongoose não conectou'))

app.use(cors());
app.use(Express.json())

app.post('/register', async (req, res)=>{
    const {nome} = req.body
    const {cep} = req.body
    const {telefone} = req.body
    const {endereco} = req.body
    const {estado} = req.body
    const {categoria} = req.body
    const {img} = req.body
    const parceiros = await User.find()
    parceiros.map(e=>{
      if(e.nome == nome){
        return response.status(404)
      }
    })
    const obj = {
        nome:nome,
        cep: cep,
        telefone: telefone,
        endereco: endereco,
        estado: estado,
        categoria: categoria,
        img: img
    }
    const newUser = User.create(obj)
    return res.json(newUser)
})
app.get('/keys', (req, res)=>{
    const chaves = [
        {chave: "16032011"}
    ]
    const jsonContent = JSON.stringify(chaves);
    res.end(jsonContent);
})
app.get('/', async (req, res)=>{
    const parceiros = await User.find()
    return res.json(parceiros)
})
app.get('/:id', async (req, res)=>{
    const parceiros = await User.find()
    const obj = parceiros.filter(e=>e.categoria == req.params.id)
    return res.json(obj)
})
app.get('/focus/:id', async (req,res)=>{
    const parceiros = await User.find()
    const obj = parceiros.filter(e=>e.img.data.id == req.params.id)
    return res.json(obj)
})
app.listen(4000)
