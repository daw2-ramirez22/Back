import {Router} from 'express'
import  {authRequired} from '../middleware/validatetoken.js'
import  {validateSchema} from '../middleware/validator.middleware.js'
import  {createTaskSchema} from '../schemas/Task.schema.js'
import { deleteUser, getUsers } from '../controllers/user.controller.js'


const router = Router()
//rutas para eliminar usuarios
router.get('/users', authRequired, getUsers)
router.delete('/user/:id', deleteUser)

//exporto rutas
export default router