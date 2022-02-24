import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
    {
        name: {type: String, riquired: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, riquired: true},
        isAdmin: {type: Boolean, default: false, required: true},
    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);
export default User;