const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'API de Gestión',
    description: 'API para gestión de productos y usuarios',
  },
  host: 'api-rest-ferremas.up.railway.app',
  basePath: '/',
  tags: [
    {
      name: 'Productos',
      description: 'Operaciones sobre productos',
    },
    {
      name: 'Usuarios',
      description: 'Operaciones sobre usuarios',
    },
  ],
  schemes: ['https'],
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
    '/usuarios': {
      post: {
        tags: ['Usuarios'],
        summary: 'Crear un nuevo usuario',
        parameters: [
          {
            name: 'body',
            in: 'body',
            description: 'Usuario a ser creado',
            required: true,
            schema: {
              type: 'object',
              properties: {
                nombre: { type: 'string' },
                correo: { type: 'string' },
                contraseña: { type: 'string' },
                es_admin: { type: 'boolean' },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Usuario creado exitosamente',
          },
          400: {
            description: 'Error al crear el usuario',
          },
        },
      },
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener todos los usuarios',
        description: 'Retorna una lista de todos los usuarios.',
        responses: {
          200: {
            description: 'Listado de usuarios obtenido exitosamente',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  nombre: { type: 'string' },
                  correo: { type: 'string' },
                  contraseña: { type: 'string' },
                  es_admin: { type: 'boolean' },
                  creado_en: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          500: {
            description: 'Error al obtener los usuarios',
          },
        },
      },
    },
    '/usuarios/{id}': {
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener un usuario por su ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID del usuario a obtener',
          },
        ],
        responses: {
          200: {
            description: 'Usuario obtenido exitosamente',
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                nombre: { type: 'string' },
                correo: { type: 'string' },
                contraseña: { type: 'string' },
                es_admin: { type: 'boolean' },
                creado_en: { type: 'string', format: 'date-time' },
              },
            },
          },
          404: {
            description: 'Usuario no encontrado',
          },
        },
      },
      put: {
        tags: ['Usuarios'],
        summary: 'Actualizar un usuario existente',
        description: 'Actualiza los detalles de un usuario existente basado en su ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID del usuario a actualizar',
          },
          {
            name: 'body',
            in: 'body',
            description: 'Campos del usuario que necesitan ser actualizados',
            required: true,
            schema: {
              type: 'object',
              properties: {
                nombre: { type: 'string' },
                correo: { type: 'string' },
                contraseña: { type: 'string' },
                es_admin: { type: 'boolean' },
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Usuario actualizado exitosamente',
          },
          400: {
            description: 'Error al actualizar el usuario',
          },
          404: {
            description: 'Usuario no encontrado',
          },
        },
      },
      delete: {
        tags: ['Usuarios'],
        summary: 'Eliminar un usuario por su ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID del usuario a eliminar',
          },
        ],
        responses: {
          204: {
            description: 'Usuario eliminado exitosamente',
          },
          400: {
            description: 'Error al eliminar el usuario',
          },
        },
      },
    },
  },
};

export default swaggerDocument;
