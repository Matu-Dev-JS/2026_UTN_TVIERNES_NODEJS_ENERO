import connectDB from "./config/connectionDB.js";

connectDB()


import express from 'express'
import ENVIRONMENT from "./config/environment.js";
import productRouter from "./routes/product.router.js";
import authRouter from "./routes/auth.router.js";
import authorizationMiddleware from "./middlewares/authorizationMiddleware.js";

//Crea nuestro web server
const app = express()

//Nuestra API puede recibir datos en formato JSON
app.use(express.json())


app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)

app.get(
    '/test', 
    authorizationMiddleware,
    (request, response) => {
        console.log('El cliente que me consulta es: ',  request.user)
        response.json(
            {
                ok: true,
                status: 200,
                message: 'Test exitoso'
            }
        )
    }
)

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log(`Servidor escuchando en el puerto ${ENVIRONMENT.PORT}`)
    }
)