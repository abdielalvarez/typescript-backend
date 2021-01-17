"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const orderSchema = new Schema({
    description: String,
    make: String,
    model: String,
    estimateDate: Number,
    id: String,
    image: String,
    inMaintenance: {
        type: Boolean,
        default: false
    },
    nameToDeliver: String,
}, { collection: 'orders' });
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
