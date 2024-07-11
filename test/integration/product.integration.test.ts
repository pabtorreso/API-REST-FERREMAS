import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../src/index';
import { server } from '../../src/server';

describe('Product API Integration Tests', function() {

  const product = {
    codigo_producto: '1234',
    marca: 'Marca1',
    codigo_marca: '001',
    nombre: 'Producto1',
    stock: 10,
    valor: 100,
    foto: 'https://via.placeholder.com/150',
    categoria: 'Categoria1'
  };

  before(async () => {
    // Limpieza inicial antes de todas las pruebas
    await request(app).delete(`/productos/${product.codigo_producto}`);
  });

  after(async () => {
    // Limpieza final después de todas las pruebas
    await request(app).delete(`/productos/${product.codigo_producto}`);
    // Cerrar el servidor después de todas las pruebas
    server.close();
  });  

  it('should create a new product', async () => {
    // Prueba para crear un nuevo producto
    const response = await request(app).post('/productos').send(product);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(201);

    // Validar que la respuesta contenga el producto creado con el código correcto
    expect(response.body[0]).to.have.property('codigo_producto', product.codigo_producto);

    // Validar otros campos del producto
    expect(response.body[0]).to.include({
      marca: product.marca,
      codigo_marca: product.codigo_marca,
      nombre: product.nombre,
      stock: product.stock,
      valor: product.valor,
      foto: product.foto,
      categoria: product.categoria
    });
  });

  it('should get a product by code', async () => {
    // Prueba para obtener un producto por código
    const response = await request(app).get(`/productos/${product.codigo_producto}`);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Validar que la respuesta contenga el producto correcto
    expect(response.body).to.have.property('codigo_producto', product.codigo_producto);

    // Validar otros campos del producto
    expect(response.body).to.include({
      marca: product.marca,
      codigo_marca: product.codigo_marca,
      nombre: product.nombre,
      stock: product.stock,
      valor: product.valor,
      foto: product.foto,
      categoria: product.categoria
    });
  });

  it('should get all products', async () => {
    // Prueba para obtener todos los productos
    const response = await request(app).get('/productos');

    // Validar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Validar que la respuesta sea un array
    expect(response.body).to.be.an('array');
  });

  it('should update a product', async () => {
    // Datos actualizados del producto
    const updatedProduct = {
      ...product,
      marca: 'MarcaActualizada',
      nombre: 'ProductoActualizado',
      stock: 20,
      valor: 150,
      categoria: 'CategoriaActualizada'
    };

    // Prueba para actualizar un producto
    const response = await request(app).put(`/productos/${product.codigo_producto}`).send(updatedProduct);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Validar que la respuesta contenga el producto actualizado
    expect(response.body).to.have.property('marca', updatedProduct.marca);

    // Validar otros campos del producto actualizado
    expect(response.body).to.include({
      codigo_marca: updatedProduct.codigo_marca,
      nombre: updatedProduct.nombre,
      stock: updatedProduct.stock,
      valor: updatedProduct.valor,
      foto: updatedProduct.foto,
      categoria: updatedProduct.categoria
    });
  });

  it('should delete a product', async () => {
    // Prueba para borrar un producto
    const response = await request(app).delete(`/productos/${product.codigo_producto}`);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(204);
  });
});
