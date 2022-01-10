import "antd/dist/antd.css";
import "./App.css";
import React, { useState } from "react";
import { Spin } from "antd";
import QuoteOverview from "./components/QuoteOverview";
import RatingInformation from "./components/RatingInformation";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState({});

  const formatValues = (values) => {
    const { first_name, last_name, line_1, line_2, city, region, postal } =
      values;
    return {
      first_name,
      last_name,
      address: {
        line_1,
        line_2,
        city,
        region,
        postal: postal ? postal.toString() : "",
      },
    };
  };

  const getQuote = (values) => {
    const formattedValues = formatValues(values);
    const endpoint = "https://fed-challenge-api.sure.now.sh/api/v1/quotes";

    setIsLoading(true);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedValues),
    })
      .then((res) => res.json())
      .then((r) => setQuote(r.quote))
      .then(() => setIsLoading(false))
      .catch((err) => console.log("Error:", err));
  };

  const updateQuote = (quote) => {
    const {
      quote: { quoteId },
    } = quote;
    const endpoint = `https://fed-challenge-api.sure.now.sh/api/v1/quotes/${quoteId}`;

    setIsLoading(true);

    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    })
      .then((res) => res.json())
      .then((r) => setQuote(r.quote))
      .then(() => setIsLoading(false))
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="App">
      {isLoading ? (
        <Spin />
      ) : Object.keys(quote).length ? (
        <QuoteOverview quote={quote} updateQuote={updateQuote} />
      ) : (
        <RatingInformation getQuote={getQuote} />
      )}
    </div>
  );
}

export default App;
