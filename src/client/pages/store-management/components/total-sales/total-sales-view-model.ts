import { ComponentViewModel, template, element } from "@nivinjoseph/n-app";
import "./total-sales-view.scss"; // importing css for the template
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { StoreService } from "../../../../../sdk/services/store-service/store-service";



@template(require("./total-sales-view.html"))
@element("totalSales")
@inject("StoreService")
export class TotalSalesViewModel extends ComponentViewModel
{
    private readonly _storeService: StoreService;


    public get invoicesLength(): number { return this._storeService.invoices.length; }
    public get totalAmount(): number { return this._storeService.totalAmount; }
    public get totalTax(): number { return this._storeService.totalTax; }
    public get totalAmountWithTax(): number { return this._storeService.totalAmountWithTax; }
    

    public constructor(storeService: StoreService)
    {
        super();
        
        given(storeService,"storeService").ensureHasValue().ensureIsObject();
        this._storeService = storeService;
    }
}