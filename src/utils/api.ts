/* eslint-disable import/no-anonymous-default-export */
import STORAGE from "../constants/storage"
import { IQuoteRequest } from "../interfaces/quote"
import CONFIG from "./config"

const API = (url: string) => {
    return fetch(`${CONFIG.BASE_API_URL}/${url}`, {
        method: 'GET'
    })
}

const StartingCountries = () => {
    const storage = localStorage.getItem(STORAGE.STARTING_COUNTRY)
    const response = new Response(storage)
    return storage ? new Promise((resolve) => resolve (response)) : API('starting-countries')
}

const DestinationCountries = (starting: string) => {
    const storage = localStorage.getItem(STORAGE.DESTINATION_COUNTRY)
    let res
    let response:Response | undefined
    if (storage) {
        const parsed = JSON.parse(storage)
        res = parsed[starting]
        response = new Response(JSON.stringify(res))
    }
    return res ? new Promise((resolve) => resolve (response)) :  API(`dest-countries?starting_country=${starting}`)
}

const PickupLocations = (starting: string) => {
    const storage = localStorage.getItem(STORAGE.PICKUP_LOCATION)
    let res
    let response:Response | undefined
    if (storage) {
        const parsed = JSON.parse(storage)
        res = parsed[starting]
        response = new Response(JSON.stringify(res))
    }
    return res ? new Promise((resolve) => resolve (response)) :  API(`pickup-locations?country=${starting}`)
}

const Quotes = (data: IQuoteRequest) => {
    const storage = localStorage.getItem(STORAGE.QUOTE)
    let res
    let response:Response | undefined
    if (storage) {
        const parsed = JSON.parse(storage)
        res = parsed[`${data.destination_country}|${data.starting_country}|${data.pickup_location}|${data.weight}`]
        response = new Response(JSON.stringify(res))
    }
    return res ? new Promise((resolve) => resolve (response)) :  API(`quotes?total_weight=${data.weight}&delivery_start_country=${data.starting_country}&delivery_dest_country=${data.destination_country}${data.pickup_location ? `&pickup_start_city=${data.pickup_location}` : ''}`)
}

export default {
    StartingCountries,
    DestinationCountries,
    PickupLocations,
    Quotes
}