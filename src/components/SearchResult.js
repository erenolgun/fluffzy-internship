import React from "react";

const SearchResult = (props) => {
  return (
    <div key={props.id}>
      <img
        className='h-full object-cover'
        src={props.url}
        alt={props.description}
      />
    </div>
  );
};

export default SearchResult;
