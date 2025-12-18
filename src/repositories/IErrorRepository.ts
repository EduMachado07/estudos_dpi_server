import z from "zod";

export class IError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export class BadRequest extends IError {
    constructor(message: string) {
        super(message, 400);
    }
}
export class ZodValidationError extends IError {
    public readonly details: Array<{ field: string; message: string }>;
    
    constructor(zodError: z.ZodError) {
        super("Dados de entrada inválidos", 400);
        
        this.details = zodError.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
    }
}

export class Unauthorized extends IError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class NotFound extends IError {
    constructor(message: string) {
        super(message, 404);
    }
}
export class Conflict extends IError {
    constructor(message: string) {
        super(message, 409);
    }
}
