import {Router} from 'express'
import  {authRequired} from '../middleware/validatetoken.js'
import {getTask,getTasks,createTask,updateTask,deleteTask} from '../controllers/task.controller.js'
import  {validateSchema} from '../middleware/validator.middleware.js'
import  {createTaskSchema} from '../schemas/Task.schema.js'


const router = Router()
//rutas de las tareas con el middleware para que requiera la autenticacion
router.get('/tasks',authRequired, getTasks)
router.get('/tasks/:id',authRequired, getTask)
//primero se valida si el usuario esta autenticado y despues se validan los datos y despues crea la tarea
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id',authRequired, updateTask)

//exporto rutas
export default router