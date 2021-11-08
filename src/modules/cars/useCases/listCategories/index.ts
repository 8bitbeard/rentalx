import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCaregoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
