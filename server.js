import express from 'express'
import products from './products.js'
import carrito from './carrito.js';
let server = express()


let PORT = 8080;


let ready = ()=>console.log('server ready on PORT: ' + PORT)


server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))


let index_route = "/"
 

let index_function = (req,res)=>{
     let  quantity = products.getProducts().length
     return res.send(`there are ${quantity}products `)
}

server.get(index_route, index_function)


let one_route = '/products/:id'

let one_function = (request,response)=>{
let parametros = request.params
let id = Number(parametros.id)
/* console.log(parametros) */
 let one = products.getProductsById(id)  
 console.log(one)
if(one){
    return response.send({
        success: true,
        product: one
    })
}else{
    return response.send({
        success: false,
        product: 'not found'
    })
}
}

 
server.get(one_route,one_function)



let query_route = '/products'

let query_function =(req,res)=>{
   let limit = req.query.limit ?? 10
    
   let product =  products.getProducts().slice(0, limit)
   if(product.length>0){
    return res.send({
        success: true,
        products: product
    })
   }else{
    return res.send({
        success: false,
        products: "not found"
    })
   }
}




server.get(query_route, query_function)

let carrito_route = "/carrito"

let carrito_function=(req,res)=>{
    let quantity = carrito.getCarts().length
    return res.send(`tenes ${quantity} de productos en el carrito `)
}

server.get(carrito_route, carrito_function)


let carrito_uno = '/carrito/:id'

let carrito_function_uno = (req,res)=>{
    let parametro = req.params
    let id = Number(parametro.id)
    let un_carrito = carrito.getCartsById(id)

    if(un_carrito){
        return res.send({
            success: true,
            product: un_carrito
        })
    }else{
        return res.send({
            success: false,
            product: 'not found'
        })
    }
}

server.get(carrito_uno, carrito_function_uno)
