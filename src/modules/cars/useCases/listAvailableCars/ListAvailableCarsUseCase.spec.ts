import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Test",
      description: "Description_Test",
      daily_rate: 110.0,
      license_plate: "Plate_Test",
      fine_amount: 40,
      brand: "Brand_Test",
      category_id: "Category_Test",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toBeInstanceOf(Array);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Test",
      description: "Description_Test",
      daily_rate: 110.0,
      license_plate: "Plate_Test",
      fine_amount: 40,
      brand: "Brand_Test_Two",
      category_id: "Category_Test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand_Test_Two",
    });

    expect(cars).toBeInstanceOf(Array);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Test_Three",
      description: "Description_Test",
      daily_rate: 110.0,
      license_plate: "Plate_Test",
      fine_amount: 40,
      brand: "Brand_Test_Two",
      category_id: "Category_Test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car_Test_Three",
    });

    expect(cars).toBeInstanceOf(Array);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Test_Three",
      description: "Description_Test",
      daily_rate: 110.0,
      license_plate: "Plate_Test",
      fine_amount: 40,
      brand: "Brand_Test_Two",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toBeInstanceOf(Array);
    expect(cars).toEqual([car]);
  });
});
