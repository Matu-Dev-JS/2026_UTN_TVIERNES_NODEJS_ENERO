//DOM = no se puede usar en NODE.js porque nuestro codigo no se ejecuta en el navegador

//alert("hola");

import filesystem from 'fs'


//Esta funcion me permite crear archivos de forma sincronica
/* filesystem.writeFileSync(
    'test.txt', 
    'hola', 
    {encoding: 'utf-8'}
) */

/* let dato = filesystem.readFileSync(
    'dato.txt', 
    { encoding: 'utf-8' }
)
 */


//Asincronia

async function crearArchivo (nombre, contenido){

    await filesystem.promises.writeFile(nombre, contenido, {encoding: 'utf-8'})
    console.log(nombre)
    console.log('El archivo se escribio correctamente')
}

async function leerArchivo (nombre){
    const result = await filesystem.promises.readFile(nombre, {encoding: 'utf-8'})
    console.log('El archivo ' + nombre + ' se leyo')
}

leerArchivo('test-2.txt')
leerArchivo('test-1.txt')



/* crearArchivo('hola.txt', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem cupiditate perferendis harum totam ad, corporis ut consequatur, incidunt est fugiat possimus dolorum animi voluptates. Quod soluta delectus')
crearArchivo('hola-2.txt', 'a') */

/* 
Crear un archivo (manualmente) numero_1.txt e ingresar un numero (aleatorio)
Crear un archivo (manualmente) numero_2.txt e ingresar un numero (aleatorio)
Leer el primer numero y guardar en una variable
Leer el segundo numero y guardar en una variable
Crear resultado.txt (pogramaticamente) donde guardamos el resultado de suma de ambos numeros
*/