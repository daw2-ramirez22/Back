import {z} from 'zod'

//schema para validar el registro
export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    })
    //minimo 6 caracteres en la contraseña
    .min(6,{
        message: 'Password must be at leas 6 characters'
    }),
});

//schema para validar el login
export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Email is not valid'
    }),
    password: z.string({
        required_error: 'Password is required'
    })
    //minimo 6 caracteres en la contraseña
    .min(6,{
        message: 'Password must be at leas 6 characters'
    }),
});