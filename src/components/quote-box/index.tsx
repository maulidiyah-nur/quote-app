/* eslint-disable react-hooks/exhaustive-deps */
import IQuote from '../../interfaces/quote';
import './index.css';
import SHIPPING_CHANNELS from '../../data/shipping-channel.json'
import { useEffect, useState } from 'react';
import { GetDate, RandomInt } from '../../utils/general';

export interface IQuoteBoxProps {
    quote: IQuote
}

const QuoteBox = (props: IQuoteBoxProps) => {
    const { quote } = props
    const [est, setEst] = useState<Array<number>>([0, 0])
    const shippingChannel = SHIPPING_CHANNELS.find((sc) => sc.label === quote.shippingChannel)

    useEffect(() => {
        const estStart = RandomInt(shippingChannel?.minStartRange || 0, shippingChannel?.maxStartRange || 0)
        const estEnd = estStart + RandomInt(shippingChannel?.minEndRange || 0, shippingChannel?.maxEndRange || 0)
        setEst([estStart, estEnd])
    }, [quote])
    
    return (
        <div className='quote-box'>
            <div className='quote-box__panel quote-box__panel--left'>
                <div className='quote-box__panel__header'>
                    <img src={`./${shippingChannel?.label.toLowerCase()}.png`} alt={shippingChannel?.label} />
                    <span>{`Traditional ${shippingChannel?.label.toLowerCase()} freight`}</span>
                </div>
                <div className='quote-box__panel__body'>
                    <div className='quote-box__panel__body__est-day'>{`${est[0]}-${est[1]} days`}</div>
                    <div className='quote-box__panel__body__est-label'>Estimated delivery</div>
                    <div className='quote-box__panel__body__est-date'>{`${GetDate(est[0])} - ${GetDate(est[1])}`}</div>
                </div>
            </div>
            <div className='quote-box__panel quote-box__panel--right'>
                <div className='quote-box__panel__header'>
                    {`${quote.startingCountry.toUpperCase()} -> ${quote.destinationCountry.toUpperCase()}`}
                </div>
                <div className='quote-box__panel__body'>
                    {`US${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(quote.price)}`}
                </div>
            </div>
        </div>
    );
}

export default QuoteBox;
