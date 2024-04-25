
export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res
            .status(400)
            //recorro el json de errores y solo printo los menssages para que sea mejor para el front y utilizar los que necesito 
            .json(error.errors.map(error => error.message))
    }   
}