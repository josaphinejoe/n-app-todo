import { ComponentViewModel, element, template} from "@nivinjoseph/n-app";
import "./input-lineItem-view.scss";
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { Validator, strval } from "@nivinjoseph/n-validate";
import { StoreService } from "../../../../../sdk/services/store-service/store-service";


@template(require("./input-lineItem-view.html"))
@element("inputLineItem")
@inject("StoreService")
export class InputLineItemViewModel extends ComponentViewModel
{
    private readonly _storeService: StoreService;
    // private _selectedTab: string;


    private _productName: string;
    private _quantity: number;
    private _mrp: number;
    private readonly _validator: Validator<this>;
    
    // public get selectedTab(): string { return this._selectedTab; }

    public get productName(): string { return this._productName; }
    public set productName(value: string) { this._productName = value; }

    public get quantity(): number { return this._quantity; }
    public set quantity(value: number) { this._quantity = value; }

    public get mrp(): number { return this._mrp; }
    public set mrp(value: number) { this._mrp = value; }

    public get hasErrors(): boolean { return !this._validate(); }
    public get errors(): Record<string, any> { return this._validator.errors; }

    public constructor(storeService: StoreService)
    {
        super();
        given(storeService, "storeService").ensureHasValue();
       

        this._storeService = storeService;
        // this._selectedTab = "inputLineItem";
        this._productName = "";
        this._quantity = 0;
        this._mrp = 0;
        this._validator =this._createValidator();
    }

    public async save(): Promise<void>
    {
        this._validator.enable();
        if(!this._validate())
            return;
        
        try
        {
            this._storeService.currentInvoice.addItem(this._productName, this._quantity, this._mrp);
        }
        catch(e)
        {
            return;
        }
    }
    
    // public cancel(): void
    // {
    //     this._selectedTab = "invoiceTab";
    // }

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