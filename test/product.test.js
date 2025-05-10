// A quantidade vendida pode ser de 1 ou mais unidades
import { text } from "express";
import Product from "../src/model/product";
import { sellProduct } from "../src/service/sellProduct";

describe('firstTest', () => {
    test('should validate the sale of a unit prpduct', () => {
        let product = new Product('Celular', 500.00, 900.00, 10)
        sellProduct(product, 1)
        expect(product.stock).toBe(9)
    })

    test('should validade the sale of many units products', () => {
        let product = new Product('Celular', 500.00, 900.00, 10)
        sellProduct(product, 5)
        expect(product.stock).toBe(5)
    })
})