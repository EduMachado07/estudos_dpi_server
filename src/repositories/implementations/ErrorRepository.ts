import { NextFunction, Request, Response } from 'express';
import { IError, ZodValidationError } from '../IErrorRepository';

export const ErrorProcessing = (
    err: Error & Partial<IError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const statusCode = err.statusCode ?? 500
    const message = err.statusCode ? err.message : 'Internal Server Error'

    if (err instanceof ZodValidationError) {
        console.log(`Erro: ${statusCode}, ${err.message}`);
        return res.status(statusCode).json({
            message: err.message,
            details: err.details // Inclui os detalhes da validação
        });
    }
    
    console.log(`Erro: ${statusCode}, ${err.message}`);
    return res.status(statusCode).json({ message })
}
