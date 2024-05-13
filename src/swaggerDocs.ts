// swaggerDocs.ts
const swaggerDocument = {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Productos API',
      description: 'API para gestión de productos',
    },
    host: 'localhost:4000',
    basePath: '/',
    tags: [
      {
        name: 'Productos',
        description: 'Operaciones sobre productos',
      },
    ],
    schemes: ['http'],
    paths: {
      '/productos': {
        post: {
          tags: ['Productos'],
          summary: 'Crear un nuevo producto',
          parameters: [
            {
              name: 'body',
              in: 'body',
              description: 'Producto a ser creado',
              required: true,
              schema: {
                type: 'object',
                properties: {
                  codigo_producto: { type: 'string' },
                  marca: { type: 'string' },
                  codigo_marca: { type: 'string' },
                  nombre: { type: 'string' },
                  stock: { type: 'integer' },
                  valor: { type: 'number' },
                  foto: { type: 'string', format: 'url', nullable: true },
                  categoria: { type: 'string' },
                },
              },
            },
          ],
          responses: {
            201: {
              description: 'Producto creado exitosamente',
            },
            400: {
              description: 'Error al crear el producto',
            },
          },
        },
      },
    },
  };
  
  export default swaggerDocument;