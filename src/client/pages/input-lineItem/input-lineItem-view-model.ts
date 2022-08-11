import { PageViewModel, template, route, NavigationService} from "@nivinjoseph/n-app";
import "./input-lineItem-view.scss";
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { Validator, strval } from "@nivinjoseph/n-validate";
import { StoreService } from "../../../sdk/services/store-service/store-service";
import { Routes } from "../routes";


@template(require("./input-lineItem-view.html"))
@route(Routes.inputPage)
@inject("StoreService", "NavigationService")
export class InputLineItemViewModel extends PageViewModel
{
    private readonly _storeService: StoreService;
    private readonly _navigationService: NavigationService;

    private _productName = "";
    private _quantity: number | undefined;
    private _mrp: number | undefined;
    private readonly _validator: Validator<this>;
    
    public get productName(): string { return this._productName; }
    public set productName(value: string) { this._productName = value; }

    public get quantity(): number { return this._quantity!; }
    public set quantity(value: number) { this._quantity = value; }

    public get mrp(): number { return this._mrp!; }
    public set mrp(value: number)
    {
        this._mrp = value;
        console.log(typeof this.mrp);
    }

    public get hasErrors(): boolean { return !this._validate(); }
    public get errors(): Record<string, any> { return this._validator.errors; }

    public constructor(storeService: StoreService, navigationService: NavigationService)
    {
        super();
        given(storeService, "storeService").ensureHasValue();
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
       
        this._storeService = storeService;
        this._navigationService = navigationService;
        this._validator =this._createValidator();
    }

    public async save(): Promise<void>
    {
        this._validator.enable();
        if(!this._validate())
            return;
        
        try
        {
            this._storeService.currentInvoice.addItem(this._productName, this._quantity!, this._mrp!);
            this._navigationService.navigate(Routes.invoicePage);
        }
        catch(e)
        {
            return;
        }
    }
    
    public cancel(): void
    {
        this._navigationService.navigate(Routes.invoicePage);
    }

    private _validate(): boolean
    {
        this._validator.validate(this);
        return this._validator.isValid;
    }

    private _createValidator(): Validator<this>
    {
        const validator = new Validator<this>(true);

        validator
            .prop("productName")
            .isRequired().withMessage("Product name is required")
            .isString()
            .useValidationRule(strval.hasMaxLength(50));
        
        validator
            .prop("quantity")
            .isRequired().withMessage("Quantity is required")
            .isNumber()
            .hasMinValue(1);

        validator
            .prop("mrp")
            .isRequired().withMessage("MRP is required")
            .isNumber()
            .hasMinValue(0.01);

        return validator;
    }
}