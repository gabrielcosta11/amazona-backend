import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import freightCalcRouter from './routers/freightCalcRouter.js';
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js';
import mercadopago from 'mercadopago'
import mercadoPagoCheckoutRouter from './routers/MercadoPagoCheckout.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useUnifiedTopology: true,
});

mercadopago.configure({
    access_token: "TEST-485675843605228-120220-2e278cb168bb9d475b7972bea2143b4e-1031482901",
})

app.use('/api/seed', productRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/freight', freightCalcRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout', mercadoPagoCheckoutRouter);
app.use('/api/uploads', uploadRouter);
app.use('/uploads', express.static(path.join(toString(process.cwd()), '..', '..', 'frontend', 'public', 'uploads')))

app.get('/', (req, res) => {
    res.send('Server is Running!')
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
})
