import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoute.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoute.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRoute };
