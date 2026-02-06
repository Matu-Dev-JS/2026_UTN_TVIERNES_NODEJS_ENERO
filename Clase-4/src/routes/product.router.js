import express from 'express'
import { buscarProductoPorId, buscarTodosLosProductos, createProduct, eliminarProductoPorId } from '../repository/product.repository.js'


const productRouter = express.Router()


productRouter.get(
    '/',
    async (request, response) => {
        const products = await buscarTodosLosProductos()
        response.json(
            {
                ok: true,
                status: 200,
                message: 'Productos obtenidos exitosamente',
                data: {
                    products
                }
            }
        )
    }
)

/* 
/:id es un parametro de busqueda, sirve para que nos envien datos por medio de la URL, en este caso el id
*/
productRouter.get(
    '/:id',
    async (request, response) => {
        //Request.params es el objeto que guardara los datos que me pasen como parametros de busqueda
        const {id} = request.params
        const product = await buscarProductoPorId(id)
        if(!product){
            return response.json(
                {
                    ok: false,
                    status: 404, //404 significa no encontrado
                    message: 'Producto no encontrado',
                }
            )
        }
        response.json(
            {
                ok: true,
                status: 200,
                message: 'Producto obtenido exitosamente',
                data: {
                    product
                }
            }
        )
    }
)

productRouter.post(
    '/',
    async (request, response) => {
        const {title, price, stock, description} = request.body
        //Agregar validacion sobre cada campo
        const product = await createProduct(title, price, stock, description)
        response.json(
            {
                ok: true,
                status: 201, //201 significa creado (Se usa cuando se crea un recurso exitosamente en el servidor)
                message: 'Producto creado exitosamente',
                data: {
                    product
                }
            }
        )
    }
)


productRouter.delete(
    '/:id',
    (request, response) => {
        const {id} = request.params
        const productToDelete = buscarProductoPorId(id)
        if(!productToDelete){
            return response.json(
                {
                    ok: false,
                    status: 404, //404 significa no encontrado
                    message: 'Producto no encontrado',
                }
            )
        }
        const product = eliminarProductoPorId(id)
        response.json(
            {
                ok: true,
                status: 200,
                message: 'Producto eliminado exitosamente',
                data: {
                    product
                }
            }
        )
    }
)


export default productRouter