export default class Validator {
    static validProduct(product) {
        const { description, buyPrice, sellPrice } = product
        if (description.length < 3) {
            throw new Error('Description must have between 3 and 50 characters')
        }
        return product
    }
}