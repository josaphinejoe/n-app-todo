import { CartViewModel } from "./cart/cart-view-model";
import { MenuViewModel } from "./menu/menu-view-model";
import { ConfirmViewModel } from "./confirm/confirm-view-model";


export const pages: Array<Function> = [
    CartViewModel,
    MenuViewModel,
    ConfirmViewModel
];