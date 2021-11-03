import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoute.post("/", (request, response) => {
  const { name, description } = request.body;

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

export { categoriesRoute };
