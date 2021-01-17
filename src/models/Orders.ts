import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

const Order = mongoose.model('Order', orderSchema)
export default Order;