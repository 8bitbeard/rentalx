import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpeficationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export { ISpeficationsRepository, ICreateSpecificationDTO };
