import jwt  from "jsonwebtoken"
import dotenv from 'dotenv';
//import { TOKEN_SECRET } from '../config.js'
dotenv.config({path: '/src/.env'})

//variable de entornodel token
const TOKEN_SECRET = process.env.TOKEN || "aslkfd"



//necesita estos tres parametros que se le pasan para considerarse middleware
export const authRequired = (req, res, next) => {
    //cojo el token de cookies
    const { token } = req.cookies
    console.log(token)
    console.log(req.cookies)
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mjk1ZjIyMGFhZjJiMDE3NWNiMWQ0NyIsImlhdCI6MTcxNDA3OTM1NywiZXhwIjoxNzE0MTY1NzU3fQ.W9o_yTyUB2d14avDHdE-I0kp2BUfCDYKL2XAdz46XgI"
    if(!token)
        //si hay un error u no me llega el token
        return res.status(401).json({message: "No token, authorization denied"})

        //si hay token pero es invalido
        jwt.verify(token,TOKEN_SECRET, (err, user) => {
            if (err) res.status(403).json({message: "Invalid token"})
            req.user = user         
            next()
        })
}
