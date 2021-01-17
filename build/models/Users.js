"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const uniqueValidator = require('mongoose-unique-validator');
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
}, { collection: 'users' });
userSchema.plugin(uniqueValidator, { message: 'Este email ya existe en la plataforma, use otro' });
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
