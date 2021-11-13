import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  create(data: ICreateCarsDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CarsRepositoryInMemory };
