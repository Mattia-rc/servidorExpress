import fs from 'fs'

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


    addCart({quantity}) {  // Función para agregar un carrito
        try {
          // Obtener el último id de carrito en la lista de carrito
          let lastId = 0;
          if (this.carrito.length > 0) {
            lastId = this.carrito[this.carrito.length - 1].id;
          }
          
          // Crear un nuevo carrito con el id autoincrementable y el array de productos vacío
          const newCart = {
            id: lastId + 1,
            products: [{
                quantity: quantity,
                pid: lastId + 1
            }]
          };
          
          // Agregar el nuevo carrito a la lista de carrito
          this.carrito.push(newCart);
          
          // Escribir la lista de carrito en el archivo
          const data_json = JSON.stringify(this.carrito, null, 2);
          fs.writeFileSync(this.path, data_json);
          
          console.log('Id creado para el carrito: ' + newCart.id);
          return 'Id del carrito creado: ' + newCart.id;
        } catch (error) {
          console.log(error);
          return 'addCart: error';
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

   carrito.addCart({quantity: 2}) 
   carrito.getCarts() 
  carrito.getCartsById(1)
  
  export default carrito