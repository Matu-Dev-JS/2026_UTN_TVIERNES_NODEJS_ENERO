import connectDB from "./config/connectionDB.js";

connectDB()


import express from 'express'
import ENVIRONMENT from "./config/environment.js";
import productRouter from "./routes/product.router.js";

//Crea nuestro web server
const app = express()

//Nuestra API puede recibir datos en formato JSON
app.use(express.json())


app.use('/api/products', productRouter)

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log(`Servidor escuchando en el puerto ${ENVIRONMENT.PORT}`)
    }
)