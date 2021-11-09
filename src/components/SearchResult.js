import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchResult = (props) => {
  const [isLiked, setIsLiked] = useState(props.photo.liked_by_user);

  useEffect(() => {
    if (props.user === null) {
      const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${props.value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
      axios.get(url).then((res) => props.handleUpdateResult(res.data.results));
    } else {
      const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${props.value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&access_token=${props.user}`;
      axios.get(url).then((res) => props.handleUpdateResult(res.data.results));
    }
  }, [isLiked]);

  const likeHandler = () => {
    axios
      .post(
        `https://api.unsplash.com/photos/${props.photo.id}/like`,
        {},
        {
          params: {
            access_token: props.user,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLiked(!isLiked);
      });
  };

  const dislikeHandler = () => {
    axios
      .delete(
        `https://api.unsplash.com/photos/${props.photo.id}/like?access_token=${props.user}`
      )
      .then((res) => {
        console.log(res);
        setIsLiked(!isLiked);
      });
  };

  return (
    <div className='relative mb-20'>
      {props.user !== null && (
        <div className='absolute inset-0 z-10 bg-black text-white text-center flex flex-col items-center justify-center opacity-0 hover:opacity-90 bg-opacity-90 duration-300'>
          {!isLiked ? (
            <div
              className='text-2xl flex items-center cursor-pointer'
              onClick={likeHandler}
            >
              <i className='fas fa-heart mr-2'></i>
              <p className='text-xl'>Like</p>
            </div>
          ) : (
            <div
              className='text-2xl flex items-center cursor-pointer'
              onClick={dislikeHandler}
            >
              <i class='fas fa-heart-broken mr-2'></i>
              <p className='text-xl'>Dislike</p>
            </div>
          )}
        </div>
      )}
      <img
        className='h-full object-cover'
        src={props.url}
        alt={props.description}
      />
    </div>
  );
};

export default SearchResult;
