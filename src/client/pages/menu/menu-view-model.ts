import { PageViewModel, route, template } from "@nivinjoseph/n-app"; // Default Imports
// Import all the possible Routes
import "./menu-view.scss"; // Importing the Styles
import { inject } from "@nivinjoseph/n-ject";
import { MenuService } from "../../../sdk/services/menuService/menuService";
import { ItemService } from "../../services/itemService/itemService";
import * as Routes from "../routes";


@template(require("./menu-view.html")) // Linking the Template to this View-Model
@route(Routes.menu) // Linking the Corresponding Routes to the correct one
@inject("MenuService", "ItemService")
export class MenuViewModel extends PageViewModel // Inheriting the PageViewModel class
{
    // View-Model Logic
    private readonly _menuService: MenuService;
    private readonly _itemService: ItemService;
    
    private _selectedStarter: string = "";
    private _selectedMain: string = "";
    private _selectedDesert: string = "";
    private _starters: Array<string> = [];
    private _mains: Array<string> = [];
    private _deserts: Array<string> = [];
    private _picked: string = "non";
    
    public get picked(): string { return this._picked; }
    public set picked(value: string)
    {
        if (value === "non")
        {
            this.fetchNon();
        }
        else
        {
            this.fetchVeg();
        }
    }
    
    
   
    
    public get selectedStarter(): string { return this._selectedStarter; }
    public set selectedStarter(value: string) { this._selectedStarter = value; }

    public get selectedMain(): string { return this._selectedMain; }
    public set selectedMain(value: string) { this._selectedMain = value; }

    public get selectedDesert(): string { return this._selectedDesert; }
    public set selectedDesert(value: string) { this._selectedDesert = value; }

    public get starters(): Array<string> { return this._starters; }

    public get mains(): Array<string> { return this._mains; }

    public get deserts(): Array<string> { return this._deserts; }
    
    
    public constructor(menuService: MenuService, itemService: ItemService)
    {
        super();
        this._menuService = menuService;
        this._itemService = itemService;
       
        
    }
    
    
    protected override onMount(): void
    {
        super.onMount;
        this.fetchNon();

    }
    
    public fetchVeg(): void {

        this._starters = this._menuService.fetchVegStarters();
        this._mains = this._menuService.fetchVegMain();
        this._deserts = this._menuService.fetchVegDesert();
    }   

   public fetchNon(): void
    {
       this._starters = this._menuService.fetchNonStarters();
       this._mains = this._menuService.fetchNonMain();
       this._deserts = this._menuService.fetchNonDesert();
    }
    

    public addItem(): void 
    {
        const itemList = { starter: this._selectedStarter, main: this._selectedMain, desert: this._selectedDesert };
        this._itemService.addItem(itemList);
        this._selectedDesert = "";
        this._selectedMain = "";
        this._selectedStarter = "";
    }
    
    
    
}