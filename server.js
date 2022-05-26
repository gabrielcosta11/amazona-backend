import express from 'express';
import mongoose from 'mongoose';
import {MongoClient} from 'mongodb'
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import freightCalcRouter from './routers/freightCalcRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import mercadopago from 'mercadopago'
import mercadoPagoCheckoutRouter from './routers/mercadoPagoCheckout.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();

const app = express();
const dest = path.resolve(process.cwd(), 'tmp', 'uploads')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_CNSTRING || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


/* const client = new MongoClient(process.env.MONGO_CNSTRING)

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

try {
    await client.connect()

    await client.db("amazona").command({ ping: 1 });
    console.log("Connected successfully to server");
} catch (error) {
    console.log(error)
} */




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
app.use('/uploads', express.static(path.resolve(process.cwd(), 'tmp', 'uploads')))

app.get('/', (req, res) => {
    res.send('Server is Running!')
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
})
