import { IQuoteRequest } from "./quote";
import IState from "./state";

export default interface IContext extends IState {
    GetStartingCountries: () => void
    GetDestinationCountries: (starting_country: string) => void
    GetPickupLocation: (starting_country: string) => void
    GetQuotes: (data: IQuoteRequest) => void
}