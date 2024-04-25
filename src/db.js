import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config({path: './.env'})
//creo la conexion a mi base de datos con variables por si se perdiera la url por ahi
const DB_USER = process.env.DB_USER
const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster-tfm.n601a9n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
//conexion a la bd
export const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

