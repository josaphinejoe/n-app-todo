import { LineItem } from "../../models/lineItem";

export interface Invoice 
{
    lineItems: Array<LineItem>;
    invoiceId: string;
    date: number;

    get amount(): number;
    get tax(): number;
    get amountWithTax(): number;

    addItem(productName: string, quantity: number, mrp: number): void;
    removeItem(lineItem: LineItem): void;
}
