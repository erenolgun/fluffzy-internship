import React from "react";

const SuggestionItem = (props) => {
  const chooseHandler = () => {
    props.handleAutocomplete(props.item);
  };

  return (
    <div
      className='cursor-pointer py-2 px-5 hover:bg-gray-200 z-20'
      onClick={chooseHandler}
    >
      <p>{props.item}</p>
    </div>
  );
};

export default SuggestionItem;
