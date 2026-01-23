import express, { response } from 'express';

//Esto nos permite crear una aplicacion de express
const app = express()
const PORT = 8081

/* 
Si queremos que nuestra api pueda recibir JSON debemos configurar el middleware para JSON
Middleware en contexto es una funcion que se ejecuta antes de la consulta
*/
app.use(express.json())

/* 
Una api tiene endpoints que serian las distintas acciones que podemos hacer sobre esta API
*/
/* 
Cada endpoint tiene la posibilidad de registrar multiples metodos
Los metodos (HTTP) se usan para separar que tipo de accion queres hacer

GET /api/products => Obtener lista de productos
POST /api/products =>  Crear un producto
PUT /api/products/:product_id => Actualizando un producto
DELETE /api/product/:product_id => Eliminar un producto
*/

app.get(
    '/',//Endpoint
    (request, response) => { //Que va a suceder cuando se acceda a este endpoin
        console.log("llego una consulta")
        response.send('<h1>Hola desde express.js</h1>')
    }
)

const productos = [
    {
        title: 'Tv samsung 50"',
        price: 4000,
        id: 1
    },
    {
        title: 'Tv samsung 32"',
        price: 2500,
        id: 2
    }
]

app.get(
    '/products',
    (request, response) => {
        response.send(
            {
                products: productos
            }
        )
    }
)

app.post(
    '/products',
    (request, response) => {
        //Request.body: Es la carga util de la consulta del cliente
        console.log(request.body)
        const {
            title, 
            price
        } = request.body

        const new_product = {
            title: title,
            price: price,
            id: productos.length + 1
        }

        productos.push(new_product)

        response.send({
            ok: true,
            message: 'El producto ha sido creado',
            products: productos
        })
    }
)



//Aqui indicamos que la aplicacion debe estar ejecutandose en el puerto 8080
//Una vez nuesta app se ejecute correctamente en el puerto designado entonces ejecutara la callback
app.listen(
    PORT,
    () => {
        console.log(`La aplicacion se esta ejecutando correctamente en puerto ${PORT}`)
    }
)