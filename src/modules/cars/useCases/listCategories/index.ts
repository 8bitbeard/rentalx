import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCaregoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoriesRepository = new CategoriesRepository();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
