export class ShopItem {
    _id: string;
    name: string;
    fancyName: string;
    rating: Array<number>;
    price: number;
    discount?: number;  
    
    public getPreviousPrice(){
        return 2;
        /*console.log('called');
        if(!this.discount){
            return;
        }
        return (this.price / this.discount) * 100;*/
    }

    public getAverageRating(){
        let sum = 0;
        if(this.rating.length > 0){
            for(let i = 0; i < this.rating.length; i++){
                sum+= this.rating[0];
            }
            return sum / this.rating.length;
        }

        else{
            return undefined;
        }
        
    }
}