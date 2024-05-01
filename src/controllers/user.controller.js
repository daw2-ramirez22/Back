import User from "../models/user.model.js";

export const getUsers = async  (req, res) => {
    try {
        //peticion para que busque en todas las tareas
        const user = await User.find()
        res.json(user)
    } catch (error) {
         //si no encontro nada y envio mensaje por consola
         return res.status(500).json({message : 'Something went wrong'})       
    }
}


export const deleteUser = async  (req, res) => {

    try {
        //busca y elimina por el id 
        const user = await User.findByIdAndDelete(req.params.id)
        console.log(user.id)
        //si no encontro nada y envio mensaje por consola
        if(!user) return res.status(404).json({message : 'Delete user not found'})
        //si lo encontro devielve un estado un estado
        return res.sendStatus(204)  
    } catch (error) {
        //si no encontro nada y envio mensaje por consola
        return res.status(404).json({message : 'User not found'})  
    }
}
