import express from "express";
import data from "../data.js";
import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'
import {isAuth, isAdmin, deleteObjectS3} from '../ultils.js'


const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {};

    const products = await Product.find({...nameFilter}).populate();
    res.send(products)
}));

productRouter.get("/seed", expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts})
}));

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Produto não encontrado.'})
    }
}));

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const product = new Product({
            name: 'slame name' + Date.now(),
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/s-adidas.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            description: 'sample description'
        })
        const createdProduct = await product.save();
        res.send({message: 'Produto Criado', product: createdProduct});
    })
);

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;

            const updatedProduct = await product.save();
            res.send({message:'Product Updated', product: updatedProduct})
        } else {
            res.status(404).send({message: 'Product Not Found'})
        }
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    deleteObjectS3,
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id)
        if(product) {
            const deleteProduct = await product.remove();
            res.send({message: 'Produto Deletado', product: deleteProduct})
        } else {
            res.status(404).send({message: 'Produto não encontrado'})
        }
    })
);

productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(product) {
            if(product.reviews.find((x) => x.userId = req.user._id)) {
                res.status(400).send({message: 'Você ja fez um comentário'})
            } else {
                const review = {
                    userName: req.user.name,
                    userId: req.user._id,
                    rating: Number(req.body.rating),
                    comment: req.body.comment,
                };
    
                console.log(review)
    
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = 
                    product.reviews.reduce((a, c) => c.rating + a, 0) / 
                    product.reviews.length;
                
                const updateProduct = await product.save();
                res.status(201).send({
                    message: 'Comentário Criado',
                    review: updateProduct.reviews[updateProduct.reviews.length - 1]
                })
            }
        }
    })
)

export default productRouter;