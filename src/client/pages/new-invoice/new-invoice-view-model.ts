import { PageViewModel, template, route, components } from "@nivinjoseph/n-app"; // Default Imports
 // Import all the possible Routes
import "./new-invoice-view.scss"; // Importing the Styles
import { inject } from "@nivinjoseph/n-ject";
import { Routes } from "../routes";
import { InputLineItemViewModel } from "./components/input-lineItem/input-lineItem-view-model";
import { StoreService } from "../../../sdk/services/store-service/store-service";
import { given } from "@nivinjoseph/n-defensive";
import { Invoice } from "../../../sdk/proxies/invoice/invoice";
import { LineItem } from "../../../sdk/models/lineItem";


@template(require("./new-invoice-view.html"))
@route(Routes.invoicePage)
@components(InputLineItemViewModel)
@inject("StoreService")
export class NewInvoiceViewModel extends PageViewModel
{
    private readonly _storeService: StoreService;
    private readonly _invoice: Array<Invoice>;
    private _selectedTab: string;

    public get storeService(): StoreService { return this._storeService; }
    public get invoice(): ReadonlyArray<Invoice> { return this._invoice; }
    public get lineItems(): ReadonlyArray<LineItem> { return this._storeService.currentInvoice.lineItems;  }
    public get selectedTab(): string { return this._selectedTab; }

    public constructor(storeService: StoreService)
    {
        super();
        given(storeService, "storeService").ensureHasValue().ensureIsObject();
        
        this._storeService = storeService;
        this._invoice = [];
        this._selectedTab = "invoiceTab";
    }
    public addItem(): void
    {
        this._selectedTab = "inputLineItem";
        console.log(this._storeService.currentInvoice);
    }
    
    public submitInvoice(): void
    {
        if (this.lineItems.length === 0)
        {
            alert('Invoice is empty!!! Add an item.');
            return;   
        }
        alert('Your total amount is $'+ this.storeService.currentInvoice.amountWithTax +' Thanks for shopping.');
        this._selectedTab = "";
    }
    public onDelete(lineItem: LineItem): void
    {
        if(lineItem.amount === 1)
            return;
        
        return;
    }

}