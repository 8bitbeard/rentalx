import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAfter = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "TestCar",
      description: "TestDescription",
      daily_rate: 100,
      license_plate: "TEST-1234",
      fine_amount: 40,
      category_id: "123123",
      brand: "TestBrand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAfter,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental when the user already have a rent", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "TestCar",
      description: "TestDescription",
      daily_rate: 100,
      license_plate: "TEST-1234",
      fine_amount: 40,
      category_id: "123123",
      brand: "TestBrand",
    });

    const rental = {
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAfter,
    };

    await createRentalUseCase.execute(rental);
    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new AppError("Car is unavailable")
    );
  });

  it("should not be able to create a new rental when the car is already rented by someone", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "TestCar",
      description: "TestDescription",
      daily_rate: 100,
      license_plate: "TEST-1234",
      fine_amount: 40,
      category_id: "123123",
      brand: "TestBrand",
    });

    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAfter,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "4321",
        car_id: car.id,
        expected_return_date: dayAfter,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with rate time less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "4321",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
