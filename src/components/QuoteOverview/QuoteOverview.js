import React, { useState } from "react";
import { Button } from "antd";
import CoverageOption from "./CoverageOption/CoverageOption";
import "./quoteOverview.scss";

function QuoteOverview({ quote, updateQuote }) {
  const {
    variable_options,
    variable_selections,
    premium,
    quoteId,
    rating_address,
    policy_holder,
  } = quote;
  const coverageOptions = Object.keys(variable_options);
  const [coverageSelections, setCoverageSelections] =
    useState(variable_selections);

  const handleUpdateQuote = () => {
    const formattedQuote = {
      quote: {
        quoteId,
        rating_address,
        policy_holder,
        variable_selections: coverageSelections,
      },
    };
    updateQuote(formattedQuote);
  };

  return (
    <div className="quote-overview">
      <div className="quote-header">Please review your quote below!</div>
      <div className="coverage-options">
        {coverageOptions.length ? (
          coverageOptions.map((option, idx) => (
            <CoverageOption
              key={idx}
              option={option}
              details={variable_options[option]}
              currentValue={coverageSelections[option]}
              setCoverageSelections={setCoverageSelections}
            />
          ))
        ) : (
          <p>No coverage options available!</p>
        )}
      </div>
      <div className="premium">Premium: ${premium.toLocaleString()}</div>
      <div className="button-container">
        <Button size="large" type="primary" onClick={handleUpdateQuote}>
          Update Quote
        </Button>
        <Button size="large" onClick={() => window.location.reload()}>
          Start New Quote
        </Button>
      </div>
    </div>
  );
}

export default QuoteOverview;
