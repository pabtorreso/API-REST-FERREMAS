import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../src/index';
import { server } from '../../src/server';

describe('User API Integration Tests', function() {
  const adminUser = {
    nombre: 'AdminTest',
    correo: `admintest${Date.now()}@example.com`,
    contraseña: 'password123',
    es_admin: true
  };

  const normalUser = {
    nombre: 'UserTest',
    correo: `usertest${Date.now()}@example.com`,
    contraseña: 'password123',
    es_admin: false
  };

  let createdAdminUserId: number;
  let createdNormalUserId: number;

  after(async () => {
    // Cerrar el servidor después de todas las pruebas
    server.close();
  });

  it('should create a new admin user', async () => {
    // Prueba para crear un nuevo usuario administrador
    const response = await request(app).post('/usuarios').send(adminUser);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(201);

    // Validar que la respuesta contenga el usuario creado con el correo correcto
    expect(response.body[0]).to.have.property('correo', adminUser.correo);

    // Guardar el ID para futuras pruebas
    createdAdminUserId = response.body[0].id;
  });

  it('should create a new normal user', async () => {
    // Prueba para crear un nuevo usuario normal
    const response = await request(app).post('/usuarios').send(normalUser);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(201);

    // Validar que la respuesta contenga el usuario creado con el correo correcto
    expect(response.body[0]).to.have.property('correo', normalUser.correo);

    // Guardar el ID para futuras pruebas
    createdNormalUserId = response.body[0].id;
  });

  it('should get a user by ID', async () => {
    // Prueba para obtener un usuario por ID
    const response = await request(app).get(`/usuarios/${createdNormalUserId}`);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Validar que la respuesta contenga el usuario correcto
    expect(response.body).to.have.property('correo', normalUser.correo);

    // Validar otros campos del usuario
    expect(response.body).to.include({
      nombre: normalUser.nombre,
      es_admin: normalUser.es_admin
    });
  });

  it('should get all users', async () => {
    // Prueba para obtener todos los usuarios
    const response = await request(app).get('/usuarios');

    // Validar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Validar que la respuesta sea un array
    expect(response.body).to.be.an('array');
  });

  it('should update a user', async () => {
    // Datos actualizados del usuario
    const updatedUser = {
      ...normalUser,
      nombre: 'UpdatedUserTest',
      correo: 'updatedusertest@example.com',
      es_admin: true
    };

    // Prueba para actualizar un usuario
    const response = await request(app).put(`/usuarios/${createdNormalUserId}`).send(updatedUser);

    // Validar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Validar que la respuesta contenga el usuario actualizado
    expect(response.body).to.have.property('nombre', updatedUser.nombre);

    // Validar otros campos del usuario actualizado
    expect(response.body).to.include({
      correo: updatedUser.correo,
      es_admin: updatedUser.es_admin
    });
  });

  it('should delete a user', async () => {
    const response = await request(app).delete(`/usuarios/${createdNormalUserId}`);
    expect(response.status).to.equal(204);
  });

  it('should delete the admin user', async () => {
    const response = await request(app).delete(`/usuarios/${createdAdminUserId}`);
    expect(response.status).to.equal(204);
  });
});
