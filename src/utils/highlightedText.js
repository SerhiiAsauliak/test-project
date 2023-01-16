import React from "react";

export const getHighlightedText = (text, higlight) => {
    const parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <mark>{part}</mark>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }

  export const CompareComponent = ({ higlight, value }) => {
    return <>{getHighlightedText(value, higlight)}</>;
  }