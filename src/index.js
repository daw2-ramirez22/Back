//import de app que se ejecutara en index desde el fichero app.js
import app from './app.js'



// import bd y conexion a la base de datos de mongo
import {connectDB} from './db.js'
connectDB()

//puerto que se levanta el srt
app.listen(4000)
//lo muestro por terminal para confirmar
console.log('Server on port', 4000)

app.get("/", (req,res) =>{
    res.send("hola mundo")
})

