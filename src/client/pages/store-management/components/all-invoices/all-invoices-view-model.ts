import {  element, ComponentViewModel, template } from "@nivinjoseph/n-app"; // Default Imports
 // Import all the possible Routes
import "./all-invoices-view.scss"; // Importing the Styles
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { StoreService } from "../../../../../sdk/services/store-service/store-service";
import { Invoice } from "../../../../../sdk/proxies/invoice/invoice";


@template(require("./all-invoices-view.html"))
@element("allInvoices")
@inject("StoreService")
export class AllInvoicesViewModel extends ComponentViewModel
{
    private readonly _storeService: StoreService;


    public get storeService(): StoreService { return this._storeService; }
    public get invoices(): Array<Invoice> { return this._storeService.invoices; }


    public constructor(storeService: StoreService)
    {
      super();
      
      given(storeService, "storeService").ensureHasValue().ensureIsObject();
        
      this._storeService = storeService;
    }

}