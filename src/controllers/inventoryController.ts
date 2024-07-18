import { Request, Response } from 'express';
import supabase from '../database/connection';

// Crear un inventario
export const createInventory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { data, error } = await supabase
            .from('inventory')
            .insert([req.body]);

        if (error) throw error;

        return res.status(201).json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al crear el inventario:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los inventarios
export const getInventories = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return res.status(400).json({ error });
        return res.json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al obtener los inventarios:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un inventario por ID
export const getInventoryById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de inventario es requerido' });

        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .eq('id_inventory', id)
            .single();

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Inventario no encontrado' });

        return res.json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al obtener el inventario por ID:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un inventario
export const updateInventory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de inventario es requerido' });

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Datos de inventario son requeridos' });
        }

        const { data, error } = await supabase
            .from('inventory')
            .update(req.body)
            .eq('id_inventory', id)
            .select('*');

        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }

        return res.json(data[0]);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al actualizar el inventario:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un inventario
export const deleteInventory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID de inventario es requerido' });

        const { data, error } = await supabase
            .from('inventory')
            .delete()
            .eq('id_inventory', id);

        if (error) return res.status(400).json({ error });
        if (!data) return res.status(404).json({ error: 'Inventario no encontrado' });

        return res.status(204).send();
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al eliminar el inventario:', errorMessage);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
