/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (request, response) => {
    // TODO: get all product
    response.json(products)
});

app.post('/products', (request, response) => {
    // TODO: Save product in array products
    const { code, description, buyPrice, sellPrice, tags } = request.body
    const onlyProduct = products.find((product) => product.code === code)
    const lov = onlyProduct ? onlyProduct.lovers : 0
    const product = {
        id: uuidv4(),
        code,
        description,
        buyPrice,
        sellPrice,
        tags,
        lovers: lov,
    }
    products.push(product)
    response.status(201).json(product)
});

app.put('/products/:id', (request, response) => {

    const { id } = request.params;
    const product = products.find(p => p?.id === id);

    if (!product) {
        return response.status(400).send('Product does not exist');
    }
    const { description, buyPrice, sellPrice, tags } = request.body;
    product.description = description;
    product.buyPrice = buyPrice;
    product.sellPrice = sellPrice;
    product.tags = tags;

    response.json(product);
});

app.delete('/products/:code', (request, response) => {
    // TODO: Remove all products with code  in params
    const { code } = request.params;
    const index = products.findIndex((v) => v.code == code);

    if (index == -1) {
        response.status(400).send();
    } else {
        products = products.filter((v) => v.code != code);
        response.status(204).send();
    }
});

app.post('/products/:code/love', (request, response) => {
    // TODO: Increment one lover in all products with same code
    const { code } = request.params
    const codeFormated = Number(code)
    const product = products.find(item => item.code === codeFormated)
    if (!product) {
        return response.status(400).send()
    }
    products
        .filter((product) => product.code === codeFormated)
        .map((item) => item.lovers += 1)
    return response.json({ lovers: product.lovers })
});


app.get('/products/:code', (request, response) => {
    // TODO: Busca de todos os produtos com o código recebido por parâmetro.
});

export default app;