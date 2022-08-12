import { InputLineItemViewModel } from "./input-lineItem/input-lineItem-view-model";
import { NewInvoiceViewModel } from "./new-invoice/new-invoice-view-model";
import { StoreManagementViewModel } from "./store-management/store-management-view-model";


export const pages: Array<Function> = [   
    StoreManagementViewModel,
    NewInvoiceViewModel,
    InputLineItemViewModel
];