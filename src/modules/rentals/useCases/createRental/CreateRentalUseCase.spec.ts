import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAfter = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAfter,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental when the user already have a rent", async () => {
    const rental = {
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAfter,
    };

    await createRentalUseCase.execute(rental);
    expect(async () => {
      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental when the car is already rented by someone", async () => {
    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: dayAfter,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "4321",
        car_id: "121212",
        expected_return_date: dayAfter,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with rate time less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "4321",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
