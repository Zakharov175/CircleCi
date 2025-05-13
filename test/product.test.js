// A quantidade vendida pode ser de 1 ou mais unidades
import app from '../src/app'
import request from 'supertest'
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

describe('lesson 2', () => {
    let products;

    beforeEach(() => {
        products = [
            {
                code: 12,
                description: 'Macbook pro',
                buyPrice: 4000,
                sellPrice: 8000,
                tags: ['tecnologia', 'Apple', 'computador']

            },
            {
                code: 99,
                description: 'Positivo pro',
                buyPrice: 1000,
                sellPrice: 2000,
                tags: ['tecnologia', 'Positivo', 'computador']
            }

        ]
    })

    test('should be possible increment a new prpduct', async () => {
        const response = await request(app)
            .post('/products')
            .send(products[0])
        expect(response.body).toMatchObject({
            ...products[0],
            lovers: 0,
        })
    })

    test('the status code of the one product should be 201', async () => {
        const response = await request(app)
            .post('/products')
            .send(products[0]);
        expect(response.status).toBe(201);
    });

    test('should be possible to update product to an existing product', async () => {
        const response = await request(app)
            .post('/products')
            .send(products[0])

        const updatedProduct = {
            ...products[0],
            description: 'Dell Vostro'
        }

        const updatedResponse = await request(app)
            .put(`/products/${response.body.id}`)
            .send(updatedProduct)
        expect(updatedResponse.body).toMatchObject(updatedProduct)
    })

    test('should not be possible to update non-existent product', async () => {
        const response = await request(app)
            .put('/products/999879');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Product does not exist');
    });

    test('no should be possible delete non-existent product', async () => {
        await request(app)
            .delete('/products/999879')
            .expect(400)
    })

    test('should return code 204 when product deleted', async () => {
        const response = await request(app)
            .post('/products')
            .send(products[0]);

        await request(app)
            .delete(`/products/${response.body.code}`)
            .expect(204);
    });

    test('should possible remove all products with same code', async () => {
        await request(app)
            .post('/products')
            .send(products[0])
        const response = await request(app)
            .post('/products')
            .send(products[0])
        await request(app)
            .post('/products')
            .send(products[1])
        await request(app)
            .delete(`/products/${response.body.code}`)
        const responseAll = await request(app)
            .get('/products')
        expect(responseAll.body).toHaveLength(1)
    });

    test('should be possible list all products', async () => {
        await request(app)
            .post('/products')
            .send(products[0])

        const responseGet = await request(app)
            .get('/products')

        expect(responseGet.body).toHaveLength(2)
    })

    test('should be possible increment lover in product', async () => {
        const response = await request(app)
            .post('/products')
            .send(products[0])

        const responseLove = await request(app)
            .post(`/products/${response.body.code}/love`)
            .send(response.body)

        expect(responseLove.body).toMatchObject({
            lovers: 1,
        })
    })
})