"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorProcessing = void 0;
const IErrorRepository_1 = require("../IErrorRepository");
const ErrorProcessing = (err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.statusCode ? err.message : 'Internal Server Error';
    if (err instanceof IErrorRepository_1.ZodValidationError) {
        console.log(`Erro: ${statusCode}, ${err.message}`);
        return res.status(statusCode).json({
            message: err.message,
            details: err.details // Inclui os detalhes da validação
        });
    }
    console.log(`Erro: ${statusCode}, ${err.message}`);
    return res.status(statusCode).json({ message });
};
exports.ErrorProcessing = ErrorProcessing;
