/* 
Los controladores se encargan de manejar las peticiones y las respuestas
*/
import bcrypt from "bcrypt"
import ServerError from "../helper/serverError.js"
import { buscarPorEmail, createUser } from "../repository/user.repository.js"
import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.js"

export async function register (request, response ){
    try{
        const {email, password} = request.body
        const user_found = await buscarPorEmail(email)
        if(user_found){
            //Throw corta la ejecucion de TRY y lanza un error
            throw new ServerError('El usuario ya existe', 400)
        }


        //El numero 10 es la complexidad de la encriptacion, a mayor numero mayor complejidad y tambien tiempo de encriptacion
        const password_crypted = await bcrypt.hash(password, 10)

        await createUser(email, password_crypted)
        response.status(201).json({
            ok: true,
            status: 201,
            message: 'Usuario creado exitosamente',
            data: null
        })
    }
    catch (error){
        //Esto maneja errores del servidor
        /* 
        Hay 2 grandes tipos de errores
            - los manejables o esperables
                Aquellos errores que son controlados por nosotros, por ejemplo
                    - Busque un usuario y no lo encontre
                    - Intento crear un usuario que ya existe
                    - Mis credenciales son incorrectas

            - los no manejables
                Aquellos que son excepciones o fallos en el codigo, cosas que NO podemos prevenir y que son imposibles de controlar
                    - La DB explota
                    - Se cae AWS
                    - Tenes un bug sin corregir en produccion 
        */
        if(error.status){
            //Si hay status de error significa que es esperable ese error y respondere con el mismo mensaje y status del error
            response.status(error.status).json({
                ok: false,
                status: error.status,
                message: error.message
            })
        }
        else{
            console.log('Error interno del servidor', error)
            response.status(500).json({
                ok: false,
                status: 500,
                message: 'Error interno del servidor'
            })
        }
    }
}

export async function login (request, response ){
    try{
        const {email, password} = request.body
        const user_found = await buscarPorEmail(email)
        if(!user_found){
            throw new ServerError('El usuario no existe', 404)
        }

        const isSamePassword = await bcrypt.compare(password, user_found.password)
        if(!isSamePassword){
            throw new ServerError('Contraseña incorrecta', 401)
        }

        const auth_token = jwt.sign(
            {
                email, id: user_found._id, 
                created_at: user_found.created_at
            }, 
            ENVIRONMENT.JWT_SECRET_KEY
        )
        
        response.status(200).json({
            ok: true,
            status: 200,
            message: 'Login exitoso',
            data: {
                auth_token
            }
        })
    }
     catch (error){
      
        if(error.status){
            response.status(error.status).json({
                ok: false,
                status: error.status,
                message: error.message
            })
        }
        else{
            console.log('Error interno del servidor', error)
            response.status(500).json({
                ok: false,
                status: 500,
                message: 'Error interno del servidor'
            })
        }
    }
}