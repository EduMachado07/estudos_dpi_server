"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatterBodyUseCase = void 0;
class FormatterBodyUseCase {
    groqProvider;
    constructor(groqProvider) {
        this.groqProvider = groqProvider;
    }
    async execute(body) {
        const formattedBody = await this.groqProvider.FormatterText(body);
        return formattedBody;
    }
}
exports.FormatterBodyUseCase = FormatterBodyUseCase;
