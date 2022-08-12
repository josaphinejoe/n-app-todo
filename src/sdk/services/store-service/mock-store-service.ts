import { Invoice } from "../../proxies/invoice/invoice";
import { MockInvoiceProxy } from "../../proxies/invoice/mock-invoice-proxy";
import { StoreService } from "./store-service";

export class MockStoreService implements StoreService
{
    private readonly _invoices: Array<Invoice> = [];
    private _currentInvoice: MockInvoiceProxy|null = null;


    public get invoices(): Array<Invoice> { return this._invoices; }
    public get currentInvoice(): MockInvoiceProxy { return this._currentInvoice!; }
    public get totalAmount(): number { return parseFloat(this.invoices.reduce((acc, invoice) => acc + invoice.amount, 0).toFixed(2)); }
    public get totalTax(): number { return parseFloat(this.invoices.reduce((acc, invoice) => acc + invoice.tax, 0).toFixed(2)); }
    public get totalAmountWithTax(): number {  return parseFloat((this.totalAmount + this.totalTax).toFixed(2)); }

  
    public createInvoice(): void 
    {
        this._currentInvoice = new MockInvoiceProxy();
        console.log('invoice created');

    }

    public submitInvoice(): void 
    {
        if (this._currentInvoice!.lineItems.length === 0) 
        {
            alert('Invoice is empty!!! Add an item.');
        }
        else
        {
            this._invoices.push(this._currentInvoice!);
            
        }
    }

    public getAllInvoices(): Array<Invoice> 
    {
        return this.invoices;
    }
}        