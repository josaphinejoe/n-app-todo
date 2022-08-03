import { MenuService } from "./menuService";

export class MenuImplementation implements MenuService
{
    
    
    public fetchVegStarters(): Array<string>
    {
        const vegStarters = ["Paneer Tikka", "Paneer Cutlet", "Aloo Tikki", "Onion Pakoda", "Veg Cutlet", "none"];
        return vegStarters;




    }
    
    // nonveg starter
    public fetchNonStarters(): Array<string>
    {
        const nonStarters = ["Chicken Cutlet", "Meat Cutlet", "Fish Fingers", "Fish Cutlet", "none"];

        return nonStarters;


    }


    // veg main course
    public fetchVegMain(): Array<string>
    {
        const vegMain = ["Veg Biriyani", "Aloo Porotta", "Paneer curry", "Romali Rotti", "Gopi Manjuri", "none"];

        return vegMain;

    }
    // non veg main course
    public fetchNonMain(): Array<string>
    {
        const nonMain = ["Chicken Biriyani", "Beef Porotta", "Butter Chicken and Nan", "Romali Rotti & Chilli chicken", "mutton Biriyani", "none"];

        return nonMain;

    }






    // veg desert
    public fetchVegDesert(): Array<string>
    {
        const vegDesert = ["Palpayasam", "custard pudding", "Gulab Jam", "Ice-Cream", "Milk Pudding", "none"];

        return vegDesert;

    }
    // nonveg desert
    public fetchNonDesert(): Array<string>
    {
        const nonDesert = ["Fish Gulab Jamun", "Ande Ka Halwa", "Gulab Jam", "Ice-Cream", "Milk Pudding", "none"];

        return nonDesert;

    }


}