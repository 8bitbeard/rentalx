import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
    expect(car).toHaveProperty("available");
  });

  it("should not be able to create a car with an existing license plate", async () => {
    const carData = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    };
    expect(async () => {
      await createCarUseCase.execute(carData);
      await createCarUseCase.execute(carData);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available property as true by default", async () => {
    const carData = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    };
    const car = await createCarUseCase.execute(carData);
    expect(car.available).toBe(true);
  });
});
