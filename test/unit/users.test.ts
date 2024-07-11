import request from 'supertest';
import { app } from '../../src/index';
import { server } from '../../src/server';

describe('User API Unit Tests', () => {
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

  beforeAll(async () => {
    // Limpia todos los usuarios antes de ejecutar las pruebas
    await request(app).delete('/usuarios');
  });

  afterAll(async () => {
    // Cerrar el servidor después de todas las pruebas
    server.close();
  });

  it('should create a new admin user', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send(adminUser);

    expect(response.status).toBe(201);
    expect(response.body[0]).toHaveProperty('correo', adminUser.correo);
    createdAdminUserId = response.body[0].id;  // Guardar el ID para futuras pruebas
  });

  it('should create a new normal user', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send(normalUser);

    expect(response.status).toBe(201);
    expect(response.body[0]).toHaveProperty('correo', normalUser.correo);
    createdNormalUserId = response.body[0].id;  // Guardar el ID para futuras pruebas
  });

  it('should get a user by ID', async () => {
    const response = await request(app).get(`/usuarios/${createdNormalUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('correo', normalUser.correo);
  });

  it('should get all users', async () => {
    const response = await request(app).get('/usuarios');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a user', async () => {
    const updatedUser = {
      ...normalUser,
      nombre: 'UpdatedUserTest',
      correo: 'updatedusertest@example.com',
      es_admin: true
    };

    const response = await request(app)
      .put(`/usuarios/${createdNormalUserId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nombre', updatedUser.nombre);
    expect(response.body).toHaveProperty('correo', updatedUser.correo);
  });

  it('should delete a user', async () => {
    const response = await request(app).delete(`/usuarios/${createdNormalUserId}`);
    expect(response.status).toBe(204);
  });
  
  it('should delete the admin user', async () => {
    const response = await request(app).delete(`/usuarios/${createdAdminUserId}`);
    expect(response.status).toBe(204);
  });
});
