import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoute.post("/", (request, response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoute.get("/", (request, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

export { categoriesRoute };
