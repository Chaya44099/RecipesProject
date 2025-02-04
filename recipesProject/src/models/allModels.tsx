export type User={
    id?:string,
    firstName?:string,
    lastName?:string,
    email?:string,
    address?:string,
    phone?:string,
    password?:string,
    authorId?:number
}
export type Ingredient = {
    value: string;
  }
export type RecipeType = {
    id?: number;
    title: string;
    description: string;
    authorId?: string;
    ingredients: Ingredient[]; 
    instructions: string;
}


