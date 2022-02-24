import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    shippingAddress: {
        fullName: {type: String, required: true},
        CEP: {type: String, required: true},
        logradouro: {type: String, required: true},
        numero: {type: String, required: true},
        complemento: {type: String},
        bairro: {type: String, required: true},
        localidade: {type: String, required: true},
        uf: {type: String, required: true},
    },
    itemsPrice: {type: Number, required: true},
    freightPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    paymentMethod: {type: String, required: true},
    paymentId: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date}
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;