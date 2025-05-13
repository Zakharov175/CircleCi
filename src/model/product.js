import { v4 as uuidv4 } from 'uuid';

export default class Product {
    constructor(code, description, buyPrice, sellPrice, tags, lovers = 0, id = uuidv4(), stock) {
        this.description = description
        this.buyPrice = buyPrice
        this.sellPrice = sellPrice
        //this.stock = stock
        this.lovers = lovers
        this.tags = tags
        this.code = code
        this.id = id
    }
}


