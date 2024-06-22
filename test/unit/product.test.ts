import request from 'supertest';
import { app, server } from '../../src/index';

describe('Product API Unit Tests', () => {
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

  afterAll(async () => {
    // Cerrar el servidor después de todas las pruebas
    server.close();
  });

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/productos')
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body[0]).toHaveProperty('codigo_producto', product.codigo_producto);
  });

  it('should get a product by code', async () => {
    const response = await request(app).get(`/productos/${product.codigo_producto}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('codigo_producto', product.codigo_producto);
  });

  it('should get all products', async () => {
    const response = await request(app).get('/productos');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a product', async () => {
    const updatedProduct = {
      ...product,
      marca: 'MarcaActualizada',
      nombre: 'ProductoActualizado',
      stock: 20,
      valor: 150,
      categoria: 'CategoriaActualizada'
    };

    const response = await request(app)
      .put(`/productos/${product.codigo_producto}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('marca', updatedProduct.marca);
  });

  it('should delete a product', async () => {
    const response = await request(app).delete(`/productos/${product.codigo_producto}`);
    expect(response.status).toBe(204);
  });
});
