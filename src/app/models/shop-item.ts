export class ShopItem {
    _id: string;
    name: string;
    fancyName: string;
    rating: Array<number>;
    price: number;
    discount?: number;    
    
    getPreviousPrice(){
        if(!this.discount){
            return;
        }
        return (this.price / this.discount) * 100;
    }
}