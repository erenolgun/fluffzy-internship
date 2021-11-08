import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between mt-10 items-center'>
        <p>PhotoSearch.</p>
        <p className='hidden md:flex'>Fluffzy React Assignment</p>
        <p className='border border-black px-3 py-0.5 cursor-pointer rounded-md'>
          Log in
        </p>
      </nav>
    </div>
  );
};

export default Navbar;
