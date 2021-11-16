import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental when the user already have a rent", async () => {
    const rental = {
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date(),
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
      expected_return_date: new Date(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "4321",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
