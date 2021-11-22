import { Router } from "express";

// eslint-disable-next-line max-len
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailUseCase = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordMailUseCase.handle);

export { passwordRoutes };
