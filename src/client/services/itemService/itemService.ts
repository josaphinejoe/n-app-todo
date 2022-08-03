import { Meal } from "./model/meal";

export interface ItemService
{
    items: ReadonlyArray<Meal>;
    
    addItem(item: Meal): void;
    
    removeItem(item: Meal): void;
    clearItems(): void;


}