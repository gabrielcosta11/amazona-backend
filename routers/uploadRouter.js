import {isAdmin} from '../ultils.js'
import multer from 'multer';
import express from 'express';
import path from 'path';
import multerConfig from '../config/upload.js'

const uploadRouter = express.Router();

const upload = multer(multerConfig);

uploadRouter.post('/', upload.single('image'), (req, res) => {
    const filename = req.file.filename
    const path = `/uploads/${filename}`
    return res.json(path)
});

export default uploadRouter;