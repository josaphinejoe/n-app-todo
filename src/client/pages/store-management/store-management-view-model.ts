import { PageViewModel, template, route, components, NavigationService } from "@nivinjoseph/n-app";
import "./store-management-view.scss"; // importing css for the template
import { Routes } from "../routes";
import { StoreService } from "../../../sdk/services/store-service/store-service";
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { Invoice } from "../../../sdk/proxies/invoice/invoice";
import { AllInvoicesViewModel } from "./components/all-invoices/all-invoices-view-model";
import { TotalSalesViewModel } from "./components/total-sales/total-sales-view-model";


@template(require("./store-management-view.html")) // path to the template
@route(Routes.store)// route that the page is going to be shown at
@components(AllInvoicesViewModel, TotalSalesViewModel)
@inject("StoreService","NavigationService") //  dependency for this VM, this gets injected in the constructor, these dependencies are installed in client.ts
export class StoreManagementViewModel extends PageViewModel
{
    private readonly _storeService: StoreService;
    private readonly _navigationService: NavigationService;
    
    
    private readonly _invoices: Array<Invoice> = [];
    private _selectedTab = "homeTab";
    private _selectedNav = "";
    
    
    public get invoices(): Array<Invoice> { return this._invoices; }
    public get selectedTab(): string { return this._selectedTab; }
    public get selectedNav(): string { return this._selectedNav; }
    
    
    public constructor(storeService: StoreService, navigationService: NavigationService)
    {
        super();
        given(storeService, "storeService").ensureHasValue().ensureIsObject();
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        
        this._storeService = storeService;
        this._navigationService = navigationService;
    }
    
    
    public createInvoice(): void
    {
        this._storeService.createInvoice();
        this._navigationService.navigate(Routes.invoicePage);
    }

    public viewTotalSales(): void
    {
        this._selectedTab = "totalSalesTab";
        this._selectedNav = "viewTotalSales";
    }

    public viewAllInvoices(): void
    {
        this._selectedTab = "allInvoicesTab";
        this._selectedNav = "viewAllInvoices";
    }
}
