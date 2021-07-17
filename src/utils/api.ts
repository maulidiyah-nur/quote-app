/* eslint-disable import/no-anonymous-default-export */
import { IQuoteRequest } from "../interfaces/quote"
import CONFIG from "./config"

const API = (url: string) => {
    return fetch(`${CONFIG.BASE_API_URL}/${url}`, {
        method: 'GET'
    })
}

const StartingCountries = () => {
    return API('starting-countries')
}

const DestinationCountries = (starting: string) => {
    return API(`dest-countries?starting_country=${starting}`)
}

const PickupLocations = (starting: string) => {
    return API(`pickup-locations?country=${starting}`)
}

const Quotes = (data: IQuoteRequest) => {
    return API(`quotes?total_weight=${data.weight}&delivery_start_country=${data.starting_country}&delivery_dest_country=${data.destination_country}${data.pickup_location ? `&pickup_start_city=${data.pickup_location}` : ''}`)
}

export default {
    StartingCountries,
    DestinationCountries,
    PickupLocations,
    Quotes
}