import { GroqProvider } from "../../../providers/implementations/GroqProvider";

export class FormatterBodyUseCase {
  constructor(private groqProvider: GroqProvider) {}
  async execute(body: string): Promise<string> {
    const formattedBody = await this.groqProvider.FormatterText(body);
    return formattedBody;
  }
}
