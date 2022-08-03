import { PageViewModel, route, template } from "@nivinjoseph/n-app"; // Default Imports
 // Import all the possible Routes
import "./cart-view.scss"; // Importing the Styles
import * as Routes from "../routes";
import { inject } from "@nivinjoseph/n-ject";
import { ItemService } from "../../services/itemService/itemService";
import { Meal } from "../../services/itemService/model/meal";


@template(require("./cart-view.html")) // Linking the Template to this View-Model
@route(Routes.cart) // Linking the Corresponding Routes to the correct one
@inject("ItemService")
export class CartViewModel extends PageViewModel // Inheriting the PageViewModel class
{
    // View-Model Logic
    private readonly _itemService: ItemService;
    
    private _items: ReadonlyArray<Meal> = [];
    
    public get items(): ReadonlyArray<Meal> { return this._items; }
    
    
    public constructor(itemService: ItemService)
    {
        super();
        this._itemService = itemService;
        this._items = this._itemService.items;
    }
    
  
    public deleteRow(value: Meal): void
    {
        this._itemService.removeItem(value);
    }
    

}
    
    
    
    
    
    
    
