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
        get: {
          tags: ['Productos'],
          summary: 'Obtener todos los productos',
          description: 'Retorna una lista de todos los productos disponibles.',
          responses: {
            200: {
              description: 'Listado de productos obtenido exitosamente',
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    codigo_producto: { type: 'string' },
                    marca: { type: 'string' },
                    codigo_marca: { type: 'string' },
                    nombre: { type: 'string' },
                    stock: { type: 'integer' },
                    valor: { type: 'number' },
                    fecha: { type: 'string', format: 'date-time' },
                    foto: { type: 'string', format: 'url', nullable: true },
                    categoria: { type: 'string' },
                  },
                },
              },
            },
            500: {
              description: 'Error al obtener los productos',
            },
          },
        },
      },
      '/productos/{codigo_producto}': {
        get: {
          tags: ['Productos'],
          summary: 'Obtener un producto por su código',
          parameters: [
            {
              name: 'codigo_producto',
              in: 'path',
              required: true,
              type: 'string',
              description: 'Código del producto a obtener',
            },
          ],
          responses: {
            200: {
              description: 'Producto obtenido exitosamente',
              schema: {
                type: 'object',
                properties: {
                  codigo_producto: { type: 'string' },
                  marca: { type: 'string' },
                  codigo_marca: { type: 'string' },
                  nombre: { type: 'string' },
                  stock: { type: 'integer' },
                  valor: { type: 'number' },
                  fecha: { type: 'string', format: 'date-time' },
                  foto: { type: 'string', format: 'url', nullable: true },
                  categoria: { type: 'string' },
                },
              },
            },
            404: {
              description: 'Producto no encontrado',
            },
          },
        },
        put: {
          tags: ['Productos'],
          summary: 'Actualizar un producto existente',
          description: 'Actualiza los detalles de un producto existente basado en su código de producto. La fecha se actualiza automáticamente al tiempo actual.',
          parameters: [
            {
              name: 'codigo_producto',
              in: 'path',
              required: true,
              type: 'string',
              description: 'Código del producto a actualizar',
            },
            {
              name: 'body',
              in: 'body',
              description: 'Campos del producto que necesitan ser actualizados',
              required: true,
              schema: {
                type: 'object',
                properties: {
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
            200: {
              description: 'Producto actualizado exitosamente',
            },
            400: {
              description: 'Error al actualizar el producto',
            },
            404: {
              description: 'Producto no encontrado',
            },
          },
        },
        delete: {
          tags: ['Productos'],
          summary: 'Eliminar un producto por su código',
          parameters: [
            {
              name: 'codigo_producto',
              in: 'path',
              required: true,
              type: 'string',
              description: 'Código del producto a eliminar',
            },
          ],
          responses: {
            204: {
              description: 'Producto eliminado exitosamente',
            },
            400: {
              description: 'Error al eliminar el producto',
            },
          },
        },
      },
    },
  };
  
  export default swaggerDocument;