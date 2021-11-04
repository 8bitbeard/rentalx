import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpeficationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export { ISpeficationsRepository, ICreateSpecificationDTO };
