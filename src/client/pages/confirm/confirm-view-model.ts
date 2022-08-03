import { PageViewModel, route, template } from "@nivinjoseph/n-app"; // Default Imports
// Import all the possible Routes
import "./confirm-view.scss"; // Importing the Styles
import * as Routes from "../routes";
import { inject } from "@nivinjoseph/n-ject";
import { ItemService } from "../../services/itemService/itemService";

@template(require("./confirm-view.html")) // Linking the Template to this View-Model
@route(Routes.confirm) // Linking the Corresponding Routes to the correct one
    @inject("ItemService")
export class ConfirmViewModel extends PageViewModel
{
    private readonly _itemService: ItemService;


    private _items: Array<object> = [];

    public get items(): Array<object> { return this._items; }

    public set items(value: object) { this._items.push(value); }


    public constructor(itemService: ItemService)
    {
        super();
        this._itemService = itemService;

        this._items.push(...this._itemService.items);

    }
    
    protected override onLeave(): void
    {
        super.onLeave();
        this._itemService.clearItems();

    }

    
}