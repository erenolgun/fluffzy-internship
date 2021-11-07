import "./App.css";

function App() {
  return (
    <div className='mx-10 md:mx-20 lg:mx-auto lg:max-w-4xl xl:max-w-5xl'>
      <nav className='hidden md:flex md:justify-between md:mt-10'>
        <p>PhotoSearch.</p>
        <p>Fluffzy React Assignment</p>
        <p className='border border-black px-3 py-0.5 cursor-pointer'>Log in</p>
      </nav>
      <nav className='flex justify-between mt-10 items-center md:hidden'>
        <p>PhotoSearch.</p>
        <p className='border border-black px-3 py-0.5 cursor-pointer rounded-md'>
          Log in
        </p>
      </nav>
      <header className='py-24 mt-10 bg-blue-100 rounded-md'>
        <div className='flex flex-col mx-10'>
          <p className='mx-auto text-center text-sm md:text-base'>
            Enter a keyword to search for a photo!
          </p>
          <div className='flex mt-4'>
            <input
              className='rounded-l-md py-1.5 outline-none px-2 w-full'
              type='text'
            />
            <button
              className='text-sm bg-yellow-100 rounded-r-md px-3'
              type='submit'
            >
              <i class='fas fa-search'></i>
            </button>
          </div>
          <div className='flex flex-col justify-between text-sm mt-6 px-1 md:text-base'>
            <p className='underline mb-1'>Suggested keywords:</p>
            <div className='md:flex md:flex-row'>
              <p className='cursor-pointer md:mr-10 xl:mr-20'>lorem</p>
              <p className='cursor-pointer md:mr-10 xl:mr-20'>lorem</p>
              <p className='cursor-pointer md:mr-10 xl:mr-20'>lorem</p>
              <p className='cursor-pointer md:mr-10 xl:mr-20'>lorem</p>
              <p className='cursor-pointer md:mr-10 xl:mr-20'>lorem</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
