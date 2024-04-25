import express from "express"
//importo las rutas desde el fighero de authenticacion de rutas
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
//import morgan para que nos llege por consola las peticiones que van llegando
import morgan from 'morgan'
// import para convertir cookies
import cookieParser from 'cookie-parser'
//importar cors
import cors from "cors"



//ejecuto express
const app = express()
//soluciono problema de cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
//ejecuto morgan para que cada vez que guarde se refresque y no tener que hacer todo el rato node src/index.js
app.use(morgan('dev'))
//para trabajar con jsons
app.use(express.json())
//para convertir cookies en objeto
app.use(cookieParser())

//ejecuto el import de autenticacion de rutas que he importado en la linea 3, coloco api para que todas las rutas de autenticaicon de usuarios tenga que comenzar con http://localhost:4000/api/XXX
app.use("/api", authRoutes)
app.use("/api", taskRoutes)


 //exporto app con express para arrancar el desde index
export default app
