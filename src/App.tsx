import React from 'react';
import IQuote from './interfaces/quote';
import SHIPPING_CHANNELS from './data/shipping-channel.json'
import COUNTRIES from './data/country.json'
import Button from './components/button';
import Form, { IFormItemProps } from './components/form';
import QuoteBox from './components/quote-box';

const defaultFormItems: Array<IFormItemProps> = [
  {
    name: 'startingCountry',
    label: 'Starting country',
    type: 'text',
  },
  {
    name: 'destinationCountry',
    label: 'Destination country',
    type: 'text',
  },
  {
    name: 'price',
    label: 'Quote price',
    type: 'number',
  },
  {
    name: 'shippingChannel',
    label: 'Shipping channel',
    type: 'select',
    options: SHIPPING_CHANNELS.map((sc) => sc.label)
  }
]

const App = () => {
  const [formItems, setFormItems] = React.useState<Array<IFormItemProps>>(defaultFormItems)
  const [quote, setQuote] = React.useState<IQuote | undefined>()
  const [validQuote, setValidQuote] = React.useState<IQuote | undefined>()

  const onChangeFormItem = (name: string, value: string | number) => {
    setQuote({...(quote || {} as IQuote), [name]: value})
  }

  const onClickButton = () => {
    formItems.forEach((fi) => {
      delete fi.error
      if (!quote || !quote[fi.name] || (fi.type !== 'number' && quote[fi.name] === '') || (fi.type === 'number' && quote[fi.name] === '0')) {
        fi.error = `${fi.label} is required`
      }
      if (['startingCountry', 'destinationCountry'].includes(fi.name) && quote && quote[fi.name] && !COUNTRIES.includes(quote[fi.name].trim().toLowerCase())) {
        fi.error = `${quote[fi.name]} is not currently available`
      }
      if (fi.name === 'destinationCountry' && quote && quote[fi.name] && quote[fi.name].trim().toLowerCase() === quote.startingCountry.trim().toLowerCase()) {
        fi.error = `${fi.label} can not be the same as Starting country`
      }
    })
    setFormItems(Object.assign([], formItems))
    if (formItems.map((fi) => fi.error).join('').length === 0) setValidQuote(Object.assign({}, quote))
  }

  return (
    <div>
      <Form items={formItems.map((fi) => ({...fi, onChange: (value) => onChangeFormItem(fi.name, value)}))} />
      <Button disabled={!quote} onClick={onClickButton}>Create quote</Button>
      {
        validQuote && <QuoteBox quote={validQuote} />
      }
    </div>
  );
}

export default App;
