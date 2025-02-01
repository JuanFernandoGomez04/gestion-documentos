import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const documentSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  cedula: z.string().min(1, 'La cédula es requerida'),
  tarjetaProfesional: z.string().min(1, 'La tarjeta profesional es requerida'),
  fecha: z.string().min(1, 'La fecha es requerida'),
  direccion: z.string().min(1, 'La dirección es requerida'),
  numeroContrato: z.string().min(1, 'El número de contrato es requerido'),
  motivoFirma: z.string().min(1, 'El motivo de firma es requerido'),
});

export const validateDocument = (req: Request, res: Response, next: NextFunction) => {
  try {
    documentSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: error.errors,
      });
    }
    return res.status(500).json({ error: 'Error de validación' });
  }
};