// index.ts
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

// Usa la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
