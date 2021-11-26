import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const profileUSerUSeCase = container.resolve(ProfileUserUseCase);
    const { id } = request.user;

    const user = await profileUSerUSeCase.execute(id);

    return response.json(user);
  }
}

export { ProfileUserController };
