const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
  try {
let producto;

producto = new Producto(req.body);

await producto.save();
res.send(producto)

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un problema')
  }
};

exports.obtenerProductos = async (req, res) => {

    try {
        const productos = await Producto.find();
        res.json(productos)
        
    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un problema')
    }
}

exports.actualizarProducto = async (req, res) => {

    try {
      const { nombre, categoria, ubicacion, precio } = req.body;
      let producto = await Producto.findById(req.params.id);
      if (!producto) {
        res.status(404).json({msg: 'Producto inexistente' })
      }

      producto.nombre = nombre;
      producto.categoria = categoria;
      producto.ubicacion = ubicacion;
      producto.precio = precio;

      producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, {new: true} )
        
res.json(producto);

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un problema')
    }
}

exports.obtenerProducto = async (req, res) => {

  try {
  
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({msg: 'Producto inexistente' })
    }
      
res.json(producto);

  } catch (error) {
      console.log(error);
  res.status(500).send('Hubo un problema')
  }
}

exports.eliminarProducto = async (req, res) => {

  try {
  
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({msg: 'Producto inexistente' })
    }
      await Producto.findOneAndRemove({ _id: req.params.id })
res.json({ msg: 'Producto eliminado correctamente!!!'});

  } catch (error) {
      console.log(error);
  res.status(500).send('Hubo un problema')
  }
}