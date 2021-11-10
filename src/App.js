import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import SuggestionItem from "./components/SuggestionItem";

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // AUTHENTICATION FUNCTIONS START
  const [authorizationCode, setAuthorizationCode] = useState(
    localStorage.getItem("auth_code")
  );
  const [user, setUser] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    if (authorizationCode !== null && user === null) {
      axios
        .post(
          "https://unsplash.com/oauth/token?",
          {},
          {
            params: {
              client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
              client_secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
              redirect_uri: "http://localhost:3000/",
              grant_type: "authorization_code",
              code: authorizationCode,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          setUser(res.data.access_token);
        });
    }
  }, [authorizationCode]);
  // AUTHENTICATION FUNCTIONS END

  // SEARCH FUNCTIONS START
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") === null
      ? []
      : JSON.parse(localStorage.getItem("searchQuery")).reverse()
  );

  const [value, setValue] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [retrievedData, setRetrievedData] = useState(
    localStorage.getItem("searchQuery")
  );

  const handleAutocomplete = (newValue) => {
    setValue(newValue);
  };

  const submitHandler = () => {
    setSearchResults([]);
    setIsSearched(false);

    const localData = JSON.parse(retrievedData);

    if (value !== "") {
      if (localData === null) {
        const sendToLocal = [];
        sendToLocal.push(value.toLowerCase());
        localStorage.setItem("searchQuery", JSON.stringify(sendToLocal));
        setRetrievedData(localStorage.getItem("searchQuery"));
        setSearchQuery(
          JSON.parse(localStorage.getItem("searchQuery")).reverse()
        );
      } else {
        const sendToLocal = JSON.parse(retrievedData);
        if (!sendToLocal.includes(value.toLowerCase())) {
          if (sendToLocal.length === 5) {
            sendToLocal.shift();
            sendToLocal.push(value.toLowerCase());
            localStorage.setItem("searchQuery", JSON.stringify(sendToLocal));
            setRetrievedData(localStorage.getItem("searchQuery"));
          } else {
            sendToLocal.push(value.toLowerCase());
            localStorage.setItem("searchQuery", JSON.stringify(sendToLocal));
            setRetrievedData(localStorage.getItem("searchQuery"));
          }
        } else {
          if (sendToLocal.length === 5) {
            const sendIncludeToLocal = sendToLocal.filter(
              (item) => item !== value.toLowerCase()
            );
            sendIncludeToLocal.push(value.toLowerCase());
            localStorage.setItem(
              "searchQuery",
              JSON.stringify(sendIncludeToLocal)
            );
            setRetrievedData(localStorage.getItem("searchQuery"));
          }
        }
        setSearchQuery(
          JSON.parse(localStorage.getItem("searchQuery")).reverse()
        );
      }

      setIsFilled(false);

      setTimeout(() => {
        setIsSearched(true);
      }, 2000);
    } else {
      setIsFilled(true);
    }

    getResult();
  };

  const getResult = () => {
    if (user === null) {
      const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
      axios.get(url).then((res) => setSearchResults(res.data.results));
    } else {
      const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&access_token=${user}`;
      axios.get(url).then((res) => setSearchResults(res.data.results));
    }
  };

  const handleUpdateResult = (value) => {
    setSearchResults(value);
  };
  // SEARCH FUNCTIONS END

  return (
    <div className='mx-10 md:mx-20 lg:mx-auto lg:max-w-4xl xl:max-w-5xl'>
      <Navbar user={user} />
      <header className='py-24 mt-10 bg-gray-100 rounded-md'>
        <div className='flex flex-col mx-10'>
          <p className='mx-auto text-center text-sm md:text-base'>
            Enter a keyword to search for a photo!
          </p>
          <div className='flex mt-4'>
            <div className='w-full relative'>
              <input
                className='w-full h-9 py-3 px-5 text-sm rounded-l-md border border-gray-300 border-r-0 outline-none'
                type='text'
                placeholder='Search free high-resolution photos'
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              {isFocused && (
                <div className='block absolute top-10 w-full border border-gray-200 bg-white text-sm rounded-md z-10'>
                  {searchQuery.map((item, index) => {
                    if (item.startsWith(value)) {
                      return (
                        <SuggestionItem
                          key={index}
                          item={item}
                          handleAutocomplete={handleAutocomplete}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
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
      <div className='grid grid-cols-1 gap-4 my-28 sm:grid-cols-2 lg:grid-cols-3'>
        {searchResults.map((searchResult) => (
          <SearchResult
            handleUpdateResult={handleUpdateResult}
            value={value}
            key={searchResult.id}
            photo={searchResult}
            user={user}
            url={searchResult.urls.regular}
            description={searchResult.alt_description}
          />
        ))}
      </div>
      {isSearched && searchResults.length === 0 && (
        <div className='flex -mt-32'>
          <div className='mx-auto'>
            There is no result with a keyword that you entered.
          </div>
        </div>
      )}
      {isFilled && (
        <div className='flex -mt-32'>
          <div className='mx-auto'>
            Please enter a keyword to search a photo!
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
