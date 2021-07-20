import React from 'react';
import ACTIONS from '../constants/action';
import STORAGE from '../constants/storage';
import IAPIResult from '../interfaces/api';
import IContext from '../interfaces/context';
import { IQuoteRequest } from '../interfaces/quote';
import API from '../utils/api'

import APP_REDUCER from './reducer';

const initialState = {
    starting_countries: {},
    destination_countries: {},
    pickup_locations: {},
    quotes: {},
    data: {},

    GetStartingCountries: () => console.log('not yet implemented feature'),
    GetDestinationCountries: (starting_country: string) => console.log('not yet implemented feature'),
    GetPickupLocation: (starting_country: string) => console.log('not yet implemented feature'),
    GetQuotes: (data: IQuoteRequest) => console.log('not yet implemented feature')
};

export const APP_CONTEXT = React.createContext<IContext>(initialState);

export const APP_PROVIDER = ({ children }: {children: any}) => {
    const [state, dispatch] = React.useReducer(APP_REDUCER, initialState)
  
    const GetStartingCountries = () => {
      dispatch({
        type: ACTIONS.STARTING_COUNTRY_REQUESTING
      });
      API.StartingCountries().then((response: any) => {
        response.json().then((res: IAPIResult) => {
          if (res.status === 200) {
            localStorage.setItem(STORAGE.STARTING_COUNTRY, JSON.stringify(res))
            dispatch({
              type: ACTIONS.STARTING_COUNTRY_SUCCESS,
              payload: {data: res.countries}
            });
          } else {
            dispatch({
              type: ACTIONS.STARTING_COUNTRY_FAILED,
              payload: { error: res.error }
            });
          }
        })
      }).catch((error) => {
        dispatch({
            type: ACTIONS.STARTING_COUNTRY_FAILED,
            payload: { error: error.message }
        });
      })
    }

    const GetDestinationCountries = (starting_country: string) => {
      dispatch({
        type: ACTIONS.DESTINATION_COUNTRY_REQUESTING
      });
      API.DestinationCountries(starting_country).then((response: any) => {
        response.json().then((res: IAPIResult) => {
          if (res.status === 200) {
            const current = localStorage.getItem(STORAGE.DESTINATION_COUNTRY)
            let parsed = current ? JSON.parse(current) : {}
            parsed[starting_country] = res
            localStorage.setItem(STORAGE.DESTINATION_COUNTRY, JSON.stringify(parsed))
            dispatch({
              type: ACTIONS.DESTINATION_COUNTRY_SUCCESS,
              payload: {data: res.countries}
            });
          } else {
            dispatch({
              type: ACTIONS.DESTINATION_COUNTRY_FAILED,
              payload: { error: res.error_message }
            });
          }
        })
      }).catch((error) => {
        dispatch({
            type: ACTIONS.DESTINATION_COUNTRY_FAILED,
            payload: { error: error.message }
        });
      })
    }

    const GetPickupLocation = (starting_country: string) => {
      dispatch({
        type: ACTIONS.PICKUP_LOCATION_REQUESTING
      });
      API.PickupLocations(starting_country).then((response: any) => {
        response.json().then((res: IAPIResult) => {
          if (res.cities) {
            const current = localStorage.getItem(STORAGE.PICKUP_LOCATION)
            let parsed = current ? JSON.parse(current) : {}
            parsed[starting_country] = res
            localStorage.setItem(STORAGE.PICKUP_LOCATION, JSON.stringify(parsed))
            dispatch({
              type: ACTIONS.PICKUP_LOCATION_SUCCESS,
              payload: {data: res.cities}
            });
          } else {
            dispatch({
              type: ACTIONS.PICKUP_LOCATION_FAILED,
              payload: { error: res.error_message }
            });
          }
        })
      }).catch((error) => {
        dispatch({
            type: ACTIONS.PICKUP_LOCATION_FAILED,
            payload: { error: error.message }
        });
      })
    }

    const GetQuotes = (data: IQuoteRequest) => {
      dispatch({
        type: ACTIONS.QUOTE_REQUESTING,
        payload: { data }
      });
      API.Quotes(data).then((response: any) => {
        response.json().then((res: IAPIResult) => {
          if (res.status === 200) {
            const current = localStorage.getItem(STORAGE.QUOTE)
            let parsed = current ? JSON.parse(current) : {}
            parsed[`${data.destination_country}|${data.starting_country}|${data.pickup_location}|${data.weight}`] = res
            localStorage.setItem(STORAGE.QUOTE, JSON.stringify(parsed))
            dispatch({
              type: ACTIONS.QUOTE_SUCCESS,
              payload: {data: res.quotes}
            });
          } else {
            dispatch({
              type: ACTIONS.QUOTE_FAILED,
              payload: { error: res.error_message }
            });
          }
        })
      }).catch((error) => {
        dispatch({
            type: ACTIONS.QUOTE_FAILED,
            payload: { error: error.message }
        });
      })
    }
  
    return (
      <APP_CONTEXT.Provider
        value={{
          ...state,
          GetStartingCountries,
          GetDestinationCountries,
          GetPickupLocation,
          GetQuotes
        }}
      >
        {children}
      </APP_CONTEXT.Provider>
    );
  };