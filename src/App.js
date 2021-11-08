import "./App.css";
import Autosuggest from "react-autosuggest";
import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") === null
      ? []
      : JSON.parse(localStorage.getItem("searchQuery"))
  );

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [retrievedData, setRetrievedData] = useState(
    localStorage.getItem("searchQuery")
  );

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : searchQuery.filter(
          (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

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

    const localData = JSON.parse(retrievedData);

    if (localData === null) {
      const sendToLocal = [];
      sendToLocal.push(value);
      localStorage.setItem("searchQuery", JSON.stringify(sendToLocal));
      setRetrievedData(localStorage.getItem("searchQuery"));
      setSearchQuery(JSON.parse(localStorage.getItem("searchQuery")));
    } else {
      const sendToLocal = JSON.parse(retrievedData);
      if (!sendToLocal.includes(value)) {
        if (sendToLocal.length === 5) {
          sendToLocal.shift();
          sendToLocal.push(value);
          localStorage.setItem("searchQuery", JSON.stringify(sendToLocal));
          setRetrievedData(localStorage.getItem("searchQuery"));
        } else {
          sendToLocal.push(value);
          localStorage.setItem("searchQuery", JSON.stringify(sendToLocal));
          setRetrievedData(localStorage.getItem("searchQuery"));
        }
        setSearchQuery(JSON.parse(localStorage.getItem("searchQuery")));
      } else {
        console.log("mevcut");
      }
    }

    const url = `https://api.unsplash.com/search/photos?page=1&query=${value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

    axios.get(url).then((res) => setSearchResults(res.data.results));
  };

  return (
    <div className='mx-10 md:mx-20 lg:mx-auto lg:max-w-4xl xl:max-w-5xl'>
      <Navbar />
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
          <SearchResult
            id={searchResult.id}
            url={searchResult.urls.regular}
            description={searchResult.alt_description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
