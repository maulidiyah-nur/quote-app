export default interface IQuote {
    startingCountry: string
    destinationCountry: string
    price: number
    shippingChannel: string
    [key: string]: any
}