import {isAdmin} from '../ultils.js'
import multer from 'multer';
import express from 'express';
import multerConfig from '../config/multerConfig.js'

const uploadRouter = express.Router();

uploadRouter.post(
    '/',
    multer(multerConfig(true)).single('image'),
    async (req, res) => {
        console.log(process.env.secretAccessKey)
        const {location, filename} = req.file
        const localUrl = `http://localhost:5000/uploads/${filename}`

        res.send(location || localUrl)
    }
)

export default uploadRouter;