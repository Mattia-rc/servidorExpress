import express from 'express'
import products from './products.js'

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