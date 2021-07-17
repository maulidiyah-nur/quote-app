/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/button";
import Form, { IFormItemProps } from "../components/form";
import { APP_CONTEXT } from '../context/state';
import { IQuoteRequest } from "../interfaces/quote";
import { IBaseState } from "../interfaces/state";

const defaultFormItems: Array<IFormItemProps> = [
    {
        name: 'weight',
        label: 'Weight',
        type: 'number',
        required: true
    },
    {
        name: 'starting_country',
        label: 'Starting country',
        type: 'select',
        required: true
    },
    {
        name: 'destination_country',
        label: 'Destination country',
        type: 'select',
        required: true
    },
    {
        name: 'pickup_location',
        label: 'Pickup Location',
        type: 'select',
    }
]

const Home = () => {
    const history = useHistory();
    const { starting_countries, destination_countries, pickup_locations, quotes, GetStartingCountries, GetDestinationCountries, GetPickupLocation } = React.useContext(APP_CONTEXT);
    const [formItems, setFormItems] = React.useState<Array<IFormItemProps>>(defaultFormItems)
    const [data, setData] = React.useState<IQuoteRequest>({})
    
    React.useEffect(() => {
        GetStartingCountries()
    }, [])

    const UpdateOptions = (index: number, base_state: IBaseState<any>, label: string) => {
        const fi_sc = formItems[index]
        fi_sc.error = base_state.error
        fi_sc.placeholder = base_state.requesting ? 'Requesting data' : `Select ${label}`
        fi_sc.options = base_state.data
        formItems[index] = fi_sc
        setFormItems(Object.assign([], formItems))
    }

    React.useEffect(() => {
        UpdateOptions(1, starting_countries, 'starting country')
    }, [starting_countries])

    React.useEffect(() => {
        if (data.starting_country) {
            GetDestinationCountries(data.starting_country)
            GetPickupLocation(data.starting_country)
        }
    }, [data.starting_country])

    React.useEffect(() => {
        UpdateOptions(2, destination_countries, 'destination country')
    }, [destination_countries])

    React.useEffect(() => {
        UpdateOptions(3, pickup_locations, 'pickup location')
    }, [pickup_locations])

    const onChangeFormItem = (name: string, value: string | number) => {
        setData({...data, [name]: value.toString()})
    }

    const onClickButton = () => {
        formItems.forEach((fi) => {
          delete fi.error
          if (fi.required && (!data || !data[fi.name] || (fi.type !== 'number' && data[fi.name] === '') || (fi.type === 'number' && data[fi.name] === '0'))) {
            fi.error = `${fi.label} is required`
          }
        })
        setFormItems(Object.assign([], formItems))
        if (formItems.map((fi) => fi.error).join('').length === 0) {
            history.push(`/quote/${data.weight}/${data.starting_country}/${data.destination_country}${data.pickup_location ? `/${data.pickup_location}` : ''}`)
        }
      }

    return (
        <React.Fragment>
            <Form items={formItems.map((fi) => ({...fi, onChange: (value) => onChangeFormItem(fi.name, value)  }))} />
            {
                quotes.error && <div className='error-message'>{quotes.error}</div> 
            }
            <Button onClick={onClickButton}>{'Create quote'}</Button>
        </React.Fragment>
    );
};

export default Home