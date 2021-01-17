import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password es obligatoria']
    },
    maintainProcesses: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'users' })

userSchema.plugin(uniqueValidator, { message: 'Este email ya existe en la plataforma, use otro' })

userSchema.methods.toJSON = function () {
    const obj: any = this.toObject()
    delete obj.password;
    return obj
}

const User = mongoose.model('User', userSchema)
export default User;