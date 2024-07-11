import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerDocs';
import { createClient, PostgrestError } from '@supabase/supabase-js';
import cors from 'cors';
import axios, { AxiosError } from 'axios';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({
  origin: '*'  // Permite todas las fuentes, ajusta según necesidad
}));

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://cumbphrwhqqisqxkrqee.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1bWJwaHJ3aHFxaXNxeGtycWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0OTM5OTAsImV4cCI6MjAzMTA2OTk5MH0.gdDM_f_nXbzAH5VxQKt4od7GchmKfhH8vqLDPta7d7c';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para manejo de JSON
app.use(express.json());



// -------------------- PRODUCTOS ----------------------------- //



// POST: Crear producto
app.post('/productos', async (req, res) => {
  const { codigo_producto, marca, codigo_marca, nombre, stock, valor, foto, categoria } = req.body;
  try {
    const response = await axios.post(`${supabaseUrl}/rest/v1/productos`, req.body, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    res.status(201).json(response.data);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error al insertar producto:', err.response.data);
      res.status(400).json({ error: err.response.data });
    } else if (err.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      // Algo más causó el error
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// GET: Obtener producto
app.get('/productos/:codigo_producto', async (req, res) => {
  const { codigo_producto } = req.params;
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/productos?codigo_producto=eq.${codigo_producto}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    if (response.data.length === 0) {
      throw new Error('Producto no encontrado');
    }
    res.status(200).json(response.data[0]);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al obtener el producto:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// GET: Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/productos`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    res.status(200).json(response.data); // Devuelve todos los productos
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al obtener productos:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// PUT: Actualizar producto
app.put('/productos/:codigo_producto', async (req, res) => {
  const { codigo_producto } = req.params;
  const { marca, codigo_marca, nombre, stock, valor, foto, categoria } = req.body;

  // Añadir la fecha actual al objeto de actualización
  const updateData = {
    ...req.body,
    fecha: new Date().toISOString()  // Esto establece la fecha al momento actual
  };

  try {
    const response = await axios.patch(`${supabaseUrl}/rest/v1/productos?codigo_producto=eq.${codigo_producto}`, updateData, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    if (response.data.length === 0) {
      throw new Error('Producto no encontrado o no modificado');
    }
    res.status(200).json(response.data[0]);  // Envía de vuelta la fila actualizada
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al actualizar el producto:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// DELETE: Borrar producto
app.delete('/productos/:codigo_producto', async (req, res) => {
  const { codigo_producto } = req.params;
  try {
    const response = await axios.delete(`${supabaseUrl}/rest/v1/productos?codigo_producto=eq.${codigo_producto}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    res.status(204).send();
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al borrar el producto:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});



// -------------------- USUARIOS ----------------------------- //



// POST: Crear usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, correo, contraseña, es_admin } = req.body;
  try {
    const response = await axios.post(`${supabaseUrl}/rest/v1/usuarios`, req.body, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    res.status(201).json(response.data);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al insertar usuario:', err.response.data);
      res.status(400).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// GET: Obtener usuario
app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/usuarios?id=eq.${id}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    if (response.data.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    res.status(200).json(response.data[0]);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al obtener el usuario:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// GET: Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/usuarios`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    res.status(200).json(response.data); // Devuelve todos los usuarios
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al obtener usuarios:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// PUT: Actualizar usuario
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña, es_admin } = req.body;

  try {
    const response = await axios.patch(`${supabaseUrl}/rest/v1/usuarios?id=eq.${id}`, req.body, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    if (response.data.length === 0) {
      throw new Error('Usuario no encontrado o no modificado');
    }
    res.status(200).json(response.data[0]);  // Envía de vuelta la fila actualizada
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al actualizar el usuario:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// DELETE: Borrar usuario
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(`${supabaseUrl}/rest/v1/usuarios?id=eq.${id}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    res.status(204).send();
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error al borrar el usuario:', err.response.data);
      res.status(err.response.status).json({ error: err.response.data });
    } else if (err.request) {
      console.error('No response received:', err.request);
      res.status(500).json({ error: 'No response from server' });
    } else {
      console.error('Error', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});



// Usa la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exporta la aplicación sin iniciar el servidor
export { app };
