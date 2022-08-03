export interface MenuService
{
    fetchVegStarters(): Array<string>;
    fetchNonStarters(): Array<string>;
    fetchNonMain(): Array<string>;
    fetchVegDesert(): Array<string>;
    fetchVegMain(): Array<string>;
    fetchNonDesert(): Array<string>;
    
        
    
}