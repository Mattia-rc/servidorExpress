import fs from 'fs'
import ProductManager from './products.js'
class cartManager{
    constructor(path){
        this.carrito = []
        this.path = path 
        this.init(path)

    }

  init(path){
    let file = fs.existsSync(path)
    if(!file){
        fs.writeFileSync(path, '[]')        //lo creamos y le declaramos un arreglo vacio
        console.log("archivo creado en: " + path)
        return 'archivo creado en path: ' + this.path
    } else {
        this.carrito = JSON.parse(fs.readFileSync(path, 'UTF-8')) //si ya esta creado lo leemos
        console.log('productos cargados')
        return 'productos cargados'
    }
    }


  
    addCart({ productId, quantity}) {                           //funcion de agregar productos
      try {
          let product = ProductManager.getProductsById(productId).description 
          let data = { product, quantity};                         // declaramos el dato donde se ingresaran los datos que le ingresamos dentro
          if (this.carrito.length > 0) {
              let next_id = this.carrito[this.carrito.length - 1].id + 1;
              data.id = next_id;
          } else {

              data.id = 1;
          }
          this.carrito.push(data);                                                          // pusheamos el producto
          let data_json = JSON.stringify(this.carrito, null, 2);                            //pasamos el dato a json
          fs.writeFileSync(this.path, data_json);     
          console.log('Id creado para el carrito: ' + data.id);
          return 'Id del carrito creado: ' + data.id;
      } catch (error) {
          console.log(error);
          return 'Error: no se pudo crear el carrito';
      }
  }
 

    
      
      getCarts() {
        try {
          if (this.carrito.length === 0) {
            console.log("Not found");
          }
          console.log(this.carrito);
          return this.carrito;
        } catch (error) {
          console.log(error);
          return "getCarts: Error";
        }
      }

      getCartsById(id) {                                               //funcion de obtener el id solicitdo
        let carritoId = this.carrito.find((p) => p.id === id)            

        if (!carritoId) {
            console.log("no se encontraron carrito con ese ID")
        } else {
            console.log(carritoId)
            return carritoId
        }
    }


  }

  let carrito = new cartManager('./data/carrito.json')
    function carritoCrear(){
      carrito.addCart({productId:1, quantity:2}) 
      carrito.addCart({productId:2, quantity:32}) 
      carrito.addCart({productId:3, quantity:10}) 
      carrito.addCart({productId:4, quantity:3}) 
       carrito.getCarts() 
     carrito.getCartsById(1) 
    }
    /*   carritoCrear()   */
  
  export default carrito