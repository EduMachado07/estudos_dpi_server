import { FormatterBodyController } from "./FormatterBody_Controller";
import { GroqProvider } from "../../../providers/implementations/GroqProvider";
import { FormatterBodyUseCase } from "./FormatterBody_UseCase";

const groqProvider = new GroqProvider();

const formatterBodyUseCase = new FormatterBodyUseCase(groqProvider);

const formatterBodyController = new FormatterBodyController(
  formatterBodyUseCase
);

export { formatterBodyController, formatterBodyUseCase };
