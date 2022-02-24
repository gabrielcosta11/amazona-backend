import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../ultils.js';

const orderRouter = express.Router();

orderRouter.post(
    "/",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: "Cart is empty" });
        } else {
            const orderExists = await Order.findOne({paymentId: req.body.paymentId});
            console.log(orderExists, 'existe?')
            if(!orderExists || orderExists === null) {
                var order = new Order({
                    orderItems: req.body.orderItems,
                    shippingAddress: req.body.shippingAddress,
                    itemsPrice: req.body.itemsPrice,
                    freightPrice: req.body.freightPrice,
                    totalPrice: req.body.totalPrice,
                    paymentMethod: req.body.paymentMethod,
                    paymentId: req.body.paymentId,
                    user: req.body.user, 
                })
            } else {
                console.log('deu ruim', req.body.paymentId)
                res.status(403).send({message: "Order already exists"})
            }
        } 
        console.log('deu tudo certo')
        const createdOrder = await order.save();
        res.status(201).send({message: 'Pedido Concluído', order: createdOrder})
    })
);

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({user: req.user._id});
        res.send(orders);
    })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order) {
            res.send(order);
        } else {
            res.status(404).send({message: 'Order Not Found'})
        }
    })
);

orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');

    res.send(orders);
}));

orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updateOrder = await order.save();
            res.send({message: 'Pedido Entregue', order: updateOrder})
        } else {
            res.status(401).send({message: 'Pedido não encontrado'})
        }
    })
)

export default orderRouter;