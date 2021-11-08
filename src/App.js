import "./App.css";
import Autosuggest from "react-autosuggest";
import { useState } from "react";

const searchQuery = [
  {
    name: "lorem",
  },
  {
    name: "lorem",
  },
  {
    name: "lorem",
  },
  {
    name: "lorem",
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : searchQuery.filter(
        (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search free high-resolution photos",
    value,
    onChange: onChange,
  };

  const submitHandler = () => {
    setSearchResults([]);

    const api_key = process.env.REACT_APP_UNSPLASH_API_KEY;

    console.log(api_key);
  };

  return (
    <div className='mx-10 md:mx-20 lg:mx-auto lg:max-w-4xl xl:max-w-5xl'>
      <nav className='hidden md:flex md:justify-between md:mt-10'>
        <p>PhotoSearch.</p>
        <p>Fluffzy React Assignment</p>
        <p className='border border-black px-3 py-0.5 cursor-pointer rounded-md'>
          Log in
        </p>
      </nav>
      <nav className='flex justify-between mt-10 items-center md:hidden'>
        <p>PhotoSearch.</p>
        <p className='border border-black px-3 py-0.5 cursor-pointer rounded-md'>
          Log in
        </p>
      </nav>
      <header className='py-24 mt-10 bg-gray-100 rounded-md'>
        <div className='flex flex-col mx-10'>
          <p className='mx-auto text-center text-sm md:text-base'>
            Enter a keyword to search for a photo!
          </p>
          <div className='flex mt-4'>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <button
              className='text-sm bg-gray-100 rounded-r-md px-3 border border-gray-300'
              type='submit'
              onClick={submitHandler}
            >
              <i className='fas fa-search'></i>
            </button>
          </div>
        </div>
      </header>
      <div className='grid grid-cols-1 gap-4 my-20 sm:grid-cols-2 lg:grid-cols-3'>
        {searchResults.map((searchResult) => (
          <div className=''>
            <img
              className='h-full object-cover'
              src={searchResult.urls.regular}
              alt={searchResult.alt_description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
