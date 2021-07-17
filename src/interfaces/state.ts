import IQuote, { IQuoteRequest } from "./quote";

export interface IBaseState<T> {
    requesting?: boolean
    data?: T
    error?: string
}

export default interface IState {
    starting_countries: IBaseState<Array<string>>
    destination_countries: IBaseState<Array<string>>
    pickup_locations: IBaseState<Array<string>>
    quotes: IBaseState<Array<IQuote>>
    data: IQuoteRequest
}