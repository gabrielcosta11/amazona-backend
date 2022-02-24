import express from 'express'
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from '../ultils.js';


const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: 'Email ou senha inválido!'})
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    })
}));

userRouter.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        res.send(user);
    } else {
        res.status(404).send({message: 'User not Found'})
    }
}));

userRouter.put('/profile', expressAsyncHandler(async(req, res) => {
    console.log('chamado antes')
    const user = await User.findById(req.body.userId);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        };

        const updateUser = await user.save();
        console.log("chamado")
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser),
        }) 
    }
}))

export default userRouter;