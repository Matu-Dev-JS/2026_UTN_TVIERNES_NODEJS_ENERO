//Product.create({title: 'Producto 1', price: 100, stock: 10, description: 'Descripción del producto 1'})
/* 
Repository suele ser un archivo donde vas a manejar la comunicacion con la DB
*/
import Product from "../models/product.model.js"


//CRUD = Create Read Update Delete
export async function createProduct (title, price, stock, description){
    const product = await Product.create({title, price, stock, description})
    console.log(product)
    return product
}

export async function buscarProductoPorId (product_id){
    const product = await Product.findById(product_id)
    console.log(product)
    return product
}

export async function buscarTodosLosProductos(){
    const products = await Product.find()
    console.log(products)
    return products
}

export async function eliminarProductoPorId (producto_id){
    const product = await Product.findByIdAndDelete(producto_id)
    console.log(product)
    return product
}

export async function actualizarProductoPorId (producto_id, title, price, stock, description){
    const product = await Product.findByIdAndUpdate(producto_id, {title, price, stock, description}, {new: true})
    console.log(product)
    return product
}