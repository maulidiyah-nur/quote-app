/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import QuoteBox from "../components/quote-box";
import { APP_CONTEXT } from "../context/state";
import { IQuoteRequest } from "../interfaces/quote";

const Quote = () => {
    let { weight, starting_country, destination_country, pickup_location } = useParams<IQuoteRequest>();
    const { quotes, data, GetQuotes } = React.useContext(APP_CONTEXT);

    React.useEffect(() => {
        GetQuotes({
            weight,
            starting_country,
            destination_country,
            pickup_location
        })
    }, [])

    return (
        <React.Fragment>
            {
                quotes.data && <QuoteBox data={data} quotes={quotes.data} />
            }
        </React.Fragment>
    );
};

export default Quote