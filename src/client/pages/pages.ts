import { ListTodosViewModel } from "./list-todos/list-todos-view-model";
import { ManagePaxViewModel } from "./manage-pax/manage-pax-view-model";
import { ManageTodoViewModel } from "./manage-todo/manage-todo-view-model";
import { NewInvoiceViewModel } from "./new-invoice/new-invoice-view-model";
import { PaxListViewModel } from "./pax-list/pax-list-view-model";
import { StoreManagementViewModel } from "./store-management/store-management-view-model";


export const pages: Array<Function> = [
    ListTodosViewModel,
    ManageTodoViewModel,

    ManagePaxViewModel,
    PaxListViewModel,
    
    StoreManagementViewModel,
    NewInvoiceViewModel
];