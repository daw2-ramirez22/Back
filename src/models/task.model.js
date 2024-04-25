import mongoose from "mongoose";
//creo schema para las tareas con titulo, descripcion
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        Required: true,
    },
    description: {
        type: String,
        Required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
},
{
    timestamps: true
})
//exporto el schema de la tarea
export default mongoose.model("Task", taskSchema)