import ACTIONS from '../constants/action';
import IAction from '../interfaces/action'
import IState from '../interfaces/state';

const APP_REDUCER = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTIONS.STARTING_COUNTRY_REQUESTING:
      return {
        ...state,
        starting_countries: {
            ...state.starting_countries,
            requesting: true
        },
        quotes: {
          ...state.quotes,
          data: undefined
        },
        data: {}
      };
    
    case ACTIONS.STARTING_COUNTRY_FAILED: {
      const { error } = action.payload
      return {
        ...state,
        starting_countries: {
            ...state.starting_countries,
            requesting: false,
            error
        }
      }
    }

    case ACTIONS.STARTING_COUNTRY_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        starting_countries: {
            ...state.starting_countries,
            requesting: false,
            data
        }
      }
    }

    case ACTIONS.DESTINATION_COUNTRY_REQUESTING:
      return {
        ...state,
        destination_countries: {
            ...state.destination_countries,
            requesting: true
        }
      };
    
    case ACTIONS.DESTINATION_COUNTRY_FAILED: {
      const { error } = action.payload
      return {
        ...state,
        destination_countries: {
            ...state.destination_countries,
            requesting: false,
            error
        }
      }
    }

    case ACTIONS.DESTINATION_COUNTRY_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        destination_countries: {
            ...state.destination_countries,
            requesting: false,
            data
        }
      }
    }

    case ACTIONS.PICKUP_LOCATION_REQUESTING:
      return {
        ...state,
        pickup_locations: {
            ...state.pickup_locations,
            requesting: true
        }
      };
    
    case ACTIONS.PICKUP_LOCATION_FAILED: {
      const { error } = action.payload
      return {
        ...state,
        pickup_locations: {
            ...state.pickup_locations,
            requesting: false,
            error
        }
      }
    }

    case ACTIONS.PICKUP_LOCATION_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        pickup_locations: {
            ...state.pickup_locations,
            requesting: false,
            data
        }
      }
    }

    case ACTIONS.QUOTE_REQUESTING:
      const { data } = action.payload
      return {
        ...state,
        quotes: {
            ...state.quotes,
            requesting: true
        },
        data
      };
    
    case ACTIONS.QUOTE_FAILED: {
      const { error } = action.payload
      return {
        ...state,
        quotes: {
            ...state.quotes,
            requesting: false,
            error
        }
      }
    }

    case ACTIONS.QUOTE_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        quotes: {
            ...state.quotes,
            requesting: false,
            data
        }
      }
    }

    default:
      return state;
  }
};
export default APP_REDUCER