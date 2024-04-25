import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({path: './.env'})


//variable de entornodel token
const TOKEN_SECRET = process.env.TOKEN || "aslkfd"

export function createAccessToken(payload){
    //creo una promesa para el token
    return new Promise ((resolve, reject)=>{
        jwt.sign(
            payload, 
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        )
    })
}
