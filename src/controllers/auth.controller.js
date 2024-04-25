//importar el modelo desde model
import User from '../models/user.model.js'
//importar modulo para encriptar la contraseña
import bcrypt from 'bcryptjs'
//importo la creacion de tokens
import {createAccessToken} from '../libs/jwt.js'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path: './.env'})

//variable de entornodel token
const TOKEN_SECRET = process.env.TOKEN || "aslkfd"
//metodo para registrar usuarios
export const register = async (req, res) => {
    const {email, password, username} = req.body
    //instancio un objeto para crear usuarios, de esta forma puedo alterar un objeto y guardarlo despuies, ya que es asincrono lo hago con try y catch
    try {
        //validacion antes de encriptar
       const userFound = await User.findOne({email})
       if (userFound) return res.status(400).json(['The email is already in use'])

        //ejecutar bcrypt para traer un metodo para encriptar un string
        const passwordHash = await bcrypt.hash(password, 10)

        //Probamos de crear un usuario con roles
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role: "user"
        })
        const userSaved = await newUser.save()   
        const token = await createAccessToken({id: userSaved.id})
        
        res.cookie('token', token)
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
            role: userSaved.role,
        })
    } catch (error) {
        //Si hay error que me lo muestre por consola
        res.status(500).json ({message:error.message})
    }
}
//metodo para logear usuarios
export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({email})
        //si el email no coincide muestro error 400 si coincide seguimos con el codigo  "Podria no ser tan descriptivo y unicamente mostrar invalid credential"
        if (!userFound) return res.status(400).json({message: "User not found"})


        //comparo la password introducida por el usuario con la de base de datos
        const isMatch = await bcrypt.compare(password, userFound.password)
        //si las contraseñas no coinciden muestro error 400 si coincide seguimos con el codigo  "Podria no ser tan descriptivo y unicamente mostrar invalid credential"
        if (!isMatch) return res.status(400).json({message: "User not found"})

        //Crear token para el usuario
        const token = await createAccessToken({id: userFound._id})
        
        res.cookie('token', token)
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        })
    } catch (error) {
        //Si hay error que me lo muestre por consola
        res.status(500).json ({message:error.message})
    }
}
//metodo para deslogear usuarios
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    //users por id
    const userFound = await User.findById(req.user.id)
    //si el usuario no es encontrado
    if(!userFound) return res.status(400).json({message: "User not found"})
    //si el usuario es encontrado
    res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    })
}
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token,TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
    
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
      });
    });
}
