import { PageViewModel, template, route, NavigationService } from "@nivinjoseph/n-app"; // Default Imports
 // Import all the possible Routes
import "./new-invoice-view.scss"; // Importing the Styles
import { inject } from "@nivinjoseph/n-ject";
import { Routes } from "../routes";
import { StoreService } from "../../../sdk/services/store-service/store-service";
import { given } from "@nivinjoseph/n-defensive";
import { Invoice } from "../../../sdk/proxies/invoice/invoice";
import { LineItem } from "../../../sdk/models/lineItem";


@template(require("./new-invoice-view.html"))
@route(Routes.invoicePage)
@inject("StoreService","NavigationService")
export class NewInvoiceViewModel extends PageViewModel
{
    private readonly _storeService: StoreService;
    private readonly _navigationService: NavigationService;
    private readonly _invoice: Array<Invoice>;
    private _shouldDelete!: boolean;

    public get storeService(): StoreService { return this._storeService; }
    public get invoice(): ReadonlyArray<Invoice> { return this._invoice; }
    public get lineItems(): ReadonlyArray<LineItem> { return this._storeService.currentInvoice.lineItems;  }

    public constructor(storeService: StoreService, navigationService: NavigationService)
    {
        super();
        given(storeService, "storeService").ensureHasValue().ensureIsObject();
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        
        this._storeService = storeService;
        this._navigationService = navigationService;
        this._invoice = [];
    }
    public addItem(): void
    {
        console.log(this._storeService.currentInvoice);
        this._navigationService.navigate(Routes.inputPage);
    }
    
    public submitInvoice(): void
    {
        if (this.lineItems.length === 0)
        {
            alert('Invoice is empty!!! Add an item.');
            return;   
        }
        alert('Your total amount is $'+ this.storeService.currentInvoice.amountWithTax +'. Thanks for shopping...');
        this._storeService.submitInvoice();
        this._navigationService.navigate(Routes.store);
    }
    public onDelete(lineItem: LineItem): void
    {
        this._shouldDelete = confirm('Are you sure you want to delete ['+ lineItem.productName +'] ?');
        if(!this._shouldDelete)
            return;
        this._storeService.currentInvoice.removeItem(lineItem);
    }

}