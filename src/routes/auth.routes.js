import {Router} from 'express'
import {login, register, logout, profile, verifyToken} from '../controllers/auth.controller.js'
import {authRequired} from '../middleware/validatetoken.js'
import {validateSchema} from '../middleware/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'


const router = Router()
//rutas post
//traigo desde middleware la validacion de registro
router.post ('/register', validateSchema(registerSchema), register)
//traigo desde middleware la validacion de login
router.post ('/login', validateSchema(loginSchema), login)
router.post ('/logout', logout)
//rutas get
router.get ('/verify', verifyToken)

router.get ('/profile', authRequired , profile)
// para exportar los enrutadores de login y register
export default router