import { Invoice } from "../../proxies/invoice/invoice";
import { MockInvoiceProxy } from "../../proxies/invoice/mock-invoice-proxy";

export interface StoreService
{
    invoices: Array<Invoice>;
    currentInvoice: MockInvoiceProxy;

    get totalAmount(): number;
    get totalTax(): number;
    get totalAmountWithTax(): number;

    createInvoice(): void;
    submitInvoice(): void;
    getAllInvoices(): Array<Invoice>;

}