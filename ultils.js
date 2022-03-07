import jwt from 'jsonwebtoken'
import aws from 'aws-sdk'
import dotenv from 'dotenv'
import Product from './models/productModel.js'

dotenv.config()

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY || 'somethingsecret',
        {
            expiresIn: '30d'
        }
    )
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWT_KEY || 'somethingsecret', (err, decode) => {
            if(err) {
                res.status(401).send({message: "Invalid Token"})
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).send({message: "No Token"})
    } 
};

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({message: "Access Denied!"})
    }
};

export const deleteObjectS3 = async (req, res, next) => {
    aws.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    });
    const s3 = new aws.S3();

    const product = await Product.findById(req.params.id)

    if(product) {
        const imageName = product.image.split('.com/')
        
        const deleteObject = s3.deleteObject({
            Bucket: 'amazona-bucket-02-22',
            Key: imageName[1]
        }).promise()

        next();
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }

}
