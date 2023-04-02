import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
    },
    cep: {
        type: Number,
    },
    telefone: {
        type: Number,
    },
    endereco: {
        type: String,
    },
    estado: {
        type: String,
    },
    categoria: {
        type: String,
    },
    img: {
        type: Object,
    }
})

export default mongoose.model('User', userSchema)
