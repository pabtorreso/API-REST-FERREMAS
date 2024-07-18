import { Request, Response } from 'express';
import supabase from '../database/connection';

// Crear un producto
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { data, error } = await supabase
            .from('product')
            .insert([req.body]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al crear el producto:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los productos con sus categorías
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { data, error } = await supabase
            .from('product')
            .select('*, category:category(id_category, category_name)')
            .order('created_at', { ascending: false });

        if (error) return res.status(400).json({ error });
        return res.json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al obtener los productos:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de producto es requerido' });

        const { data, error } = await supabase
            .from('product')
            .select('*')
            .eq('id_product', id)
            .single();

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

        return res.json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al obtener el producto por ID:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de producto es requerido' });

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Datos de producto son requeridos' });
        }

        const { data, error } = await supabase
            .from('product')
            .update(req.body)
            .eq('id_product', id)
            .select('*');

        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.json(data[0]);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al actualizar el producto:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de producto es requerido' });

        const { data, error } = await supabase
            .from('product')
            .delete()
            .eq('id_product', id);

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

        return res.status(204).send();
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al eliminar el producto:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
