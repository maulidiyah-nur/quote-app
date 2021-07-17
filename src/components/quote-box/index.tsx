/* eslint-disable react-hooks/exhaustive-deps */
import IQuote, { IBaseQuote, IQuoteRequest } from '../../interfaces/quote';
import './index.css';
import { GetDate } from '../../utils/general';
import React from 'react';

export interface IQuoteBoxProps {
    quotes: Array<IQuote>
    data: IQuoteRequest
}

const SORT = ['total_price', 'min_days_delivery', 'max_days_delivery']

const QuoteBox = (props: IQuoteBoxProps) => {
    const { quotes, data } = props
    const [sort, setSort] = React.useState<string>(SORT[0])

    const RenderEstimation = (q: IBaseQuote, label: string) => {
        return (<div className='quote-box__panel__body'>
            <div className='quote-box__panel__body__est-day'>{`${q.min_days_delivery}-${q.max_days_delivery} days`}</div>
            <div className='quote-box__panel__body__est-label'>{label}</div>
            <div className='quote-box__panel__body__est-date'>{`${GetDate(q.min_days_delivery)} - ${GetDate(q.max_days_delivery)}`}</div>
        </div>)
    }
    
    return <>
    <select value={sort} onChange={(e) => {
        setSort(e.target.value)
    }}>
        {
            SORT.map((s) => <option key={s} value={s}>{s}</option>)
        }
    </select>
    {quotes.sort((a, b) => a[sort] - b[sort]).map((q) => (
        <div key={q.total_price} className='quote-box'>
            <div className='quote-box__panel quote-box__panel--left'>
                <div className='quote-box__panel__header'>
                    <img src={`/air.png`} alt='air freight' />
                    <span>{`Air freight`}</span>
                </div>
                {RenderEstimation(q.delivery_quote, 'Estimated Delivery')}
                { q.pickup_quote && (RenderEstimation(q.pickup_quote, 'Estimated Pickup Delivery'))}
                {RenderEstimation(q.delivery_quote, 'Estimated Total Delivery')}
            </div>
            <div className='quote-box__panel quote-box__panel--right'>
                <div className='quote-box__panel__header'>
                    {`${data.starting_country}${data.pickup_location ? ` (picked up at : ${data.pickup_location})` : ''} -> ${data.destination_country}`}
                </div>
                <div className='quote-box__panel__body'>
                    {`US${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(q.total_price)}`}
                </div>
            </div>
        </div>
    ))}
    </>
}

export default QuoteBox;
