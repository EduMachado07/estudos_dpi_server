import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export class GroqProvider {
  async FormatterText(text: string) {
    const prompt = `
    Você é um especialista em revisão de texto e formatação para editores baseados em HTML (como o TipTap).

    Sua tarefa:
    1. Corrija erros ortográficos e de gramática.
    2. Melhore a clareza, sem mudar o sentido.
    3. Estruture o texto em HTML organizado:
    - parágrafos <p>
    - títulos <h1>, <h2>, <h3>
    - listas <ol>, <ul>, <li>
    - sublinhado <u>
    - linhas horizontais <hr>
    - negrito <strong>
    - itálico <em>
    - citações <blockquote>

    4. Produza somente HTML válido.

    Texto original:
    ${text}
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Você gera HTML limpo e formatado." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    return response.choices[0].message.content;
  }
}
