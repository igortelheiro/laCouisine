import { Ingredient } from './ingredient.mode';

export class Product {
  constructor(
    public name: string,

    public imagePath: string,

    public price: number,

    public productionTime: number,

    public productionTimeUnit: string,

    public ingredients: Ingredient[],

    public imageUrl?: string,

    public id?: string,
  ) {}
}
