export interface IBaseQuote {
    min_days_delivery: number
    max_days_delivery: number
}
interface IDeliveryQuote extends IBaseQuote {
    starting_country: string
    dest_country: string
    price: number
}
interface IPickupQuote extends IBaseQuote {
    start_city: string
    price: number
}
export interface IQuoteRequest {
    weight?: string
    starting_country?: string
    destination_country?: string
    pickup_location?: string
    [key: string]: string | undefined
}
export default interface IQuote extends IBaseQuote {
    total_price : number
    delivery_quote: IDeliveryQuote
    pickup_quote?: IPickupQuote
    [key: string]: any
}