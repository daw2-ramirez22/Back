import mongoose from "mongoose";

//creo el schema del usuario con username, email, contraseña
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        value: "user"
    },
},
{
    timestamps: true
})
//exporto el schema del usuario
export default mongoose.model('User', userSchema)
