import fs from 'fs'


class ProductManager {              // creamos la estructura del constructor llamado productManager
    constructor(path) { 
        this.productos = [];        // declaramos en el constructor el array de peoductos en el cual van a estar dichos productos
        this.path = path             // ruta donde va a estar la carpeta
        this.init(path)                //inicializar path
    }
    init(path) {                              
        let file = fs.existsSync(path)          // definimos file y usamos la funcion existsSync para saber si existe
        if (!file) {                            // si no existe el archivo
            fs.writeFileSync(path, '[]')        //lo creamos y le declaramos un arreglo vacio
            console.log("archivo creado en: " + path)
            return 'archivo creado en path: ' + this.path
        } else {
            this.productos = JSON.parse(fs.readFileSync(path, 'UTF-8')) //si ya esta creado lo leemos
            console.log('productos cargados')
            return 'productos cargados'
        }
    }

    addProduct({ title, description, price, thumbnail, stock }) {                           //funcion de agregar productos
        const existingProduct = this.productos.find((p) => p.description === description);  //delcaramos var para saber si el producto con dicha descripcion ya existe
        if (existingProduct) {                                                              // si el producto existe
            console.log('Error: el producto ya existe');
            return 'Error: el producto ya existe';
        }
        try {
            if (!title || !description || !price || !thumbnail || !stock) {

                throw new Error('Todos los campos son obligatorios!!')
               
            }
            let data = { title, description, price, thumbnail, stock };                         // declaramos el dato donde se ingresaran los datos que le ingresamos dentro
            if (this.productos.length > 0) {
                let next_id = this.productos[this.productos.length - 1].id + 1;
                data.id = next_id;
            } else {

                data.id = 1;
            }
            this.productos.push(data);                                                          // pusheamos el producto
            let data_json = JSON.stringify(this.productos, null, 2);                            //pasamos el dato a json
            fs.writeFileSync(this.path, data_json);     
            console.log('Id creado para el producto: ' + data.id);
            return 'Id del producto creado: ' + data.id;
        } catch (error) {
            console.log(error);
            return 'Error: no se pudo crear el producto';
        }
    }

    
    getProducts() {
        try {
          if (this.productos.length === 0) {
            console.log("Not found");
          }
          console.log(this.productos);
          return this.productos;
        } catch (error) {
          console.log(error);
          return "getProduct: Error";
        }
      }

    getProductsById(id) {                                               //funcion de obtener el id solicitdo
        let productoId = this.productos.find((p) => p.id === id)            

        if (!productoId) {
            console.log("no se encontraron productos con ese ID")
        } else {
            console.log(productoId)
            return productoId
        }
    }

    updateProduct(id, data) {
        try {
            let productos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            let product = productos.find(product => product.id === id);
            if (product) {
                for (let prop in data) {
                    product[prop] = data[prop];
                }
                let data_json = JSON.stringify(productos, null, 2);
                fs.writeFileSync(this.path, data_json);
                console.log('producto actualizado correctamente: ' + id);
                return 'producto actualizado correctamente: ' + id;
            } else {
                console.log('error: producto no encontrado');
                return 'error: producto no encontrado';
            }
        } catch (error) {
            console.log(error);
            return 'error: actualizando producto';
        }
    }

   
    deleteProduct(id) {
        try {
          const index = this.productos.findIndex((p) => p.id === id);
          if (index === -1) {
            throw new Error(`El producto con el ID ${id} no existe`);
          }
          this.productos.splice(index, 1);
          const data_json = JSON.stringify(this.productos, null, 2);
          fs.writeFileSync(this.path, data_json);
          console.log(`Producto eliminado: ${id}`);
          return `Producto eliminado: ${id}`;
        } catch (error) {
          console.log(error);
          return `Error: ${error.message}`;
        }
      }
      
   
}
let producto = new ProductManager('./data/productos.json')
function productos() {
    producto.addProduct({ title: "Iphone", description: "iphone 13 mini", price: 1200, thumbnail: "img", stock: 2 })
    producto.addProduct({ title: "iphone", description: "iphone 12 mini", price: 1000, thumbnail: "img", stock: 4 });
    producto.addProduct({ title: "iphone", description: "iphone 11 ", price: 2300, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone X ", price: 233, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone XR ", price: 205, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone 8 ", price: 230, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone 7 ", price: 250, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone 6 ", price: 230, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone 6s ", price: 500, thumbnail: "img", stock: 3 });
    producto.addProduct({ title: "iphone", description: "iphone 8 plus ", price: 200, thumbnail: "img", stock: 3 });
    producto.getProductsById(9)
    producto.updateProduct(9, {description: "iphone 14 plus", price: 2000})
    producto.deleteProduct(10)
    producto.getProducts()
}

/* productos() */

export default producto