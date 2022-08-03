import { ItemService } from "./itemService";
import { Meal } from "./model/meal";


export class ItemServiceImplementation implements ItemService
{
    private _items: Array<Meal> = [];
    
    public get items(): ReadonlyArray<Meal> { return this._items; }
    
    
    public addItem(item: Meal): void
    {
        this._items.push(item);
        
    }
    public removeItem(value: Meal): void
    {
        this._items.remove(value);
    }
    public clearItems(): void
    {
        this._items.clear();
    }
    

    


}