import React, { useEffect } from "react";

const Navbar = (props) => {
  const base_url = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&redirect_uri=http://localhost:3000/&response_type=code&scope=public+write_likes`;

  useEffect(() => {
    if (window.location.href.includes("http://localhost:3000/?code=")) {
      const authorizationCodeURL = window.location.href;
      const index = authorizationCodeURL.indexOf("=");
      const authorizationCode = authorizationCodeURL.substr(index + 1);

      localStorage.setItem("auth_code", authorizationCode);
      window.location.replace("http://localhost:3000/");
    }
  });

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_code");
    window.location.replace("http://localhost:3000/");
  };

  return (
    <div>
      <nav className='flex justify-between mt-10 items-center'>
        <a href='/'>PhotoSearch.</a>
        <p className='hidden md:flex'>Fluffzy React Assignment</p>
        {props.user === null ? (
          <a
            className='border border-black px-3 py-0.5 cursor-pointer rounded-md'
            href={base_url}
          >
            Log in
          </a>
        ) : (
          <button
            className='border border-black px-3 py-0.5 cursor-pointer rounded-md'
            onClick={logoutHandler}
          >
            Log out
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
