import { useState } from "react";
import { Link } from "react-router-dom";
import "tw-elements";

const Navbar = () => {
  const [auth, setauth] = useState(false)
  const [member, setMember] = useState(false)
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div
          className="collapse navbar-collapse flex-grow items-center"
          id="navbarSupportedContent1"
        >
          <Link className="text-xl text-white pr-2 font-semibold" to='/'>
            FileStorage
          </Link>
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <Link className="nav-link text-white" to='/'>
                Home
              </Link>
            </li>
            {auth && (<li className="nav-item p-2">
              <Link
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                to="/shared"
              >
                Shared Storage
              </Link>
            </li>)}
            {auth && member &&(<li className="nav-item p-2">
              <Link
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                to='/'
              >
                My Files
              </Link>
            </li>)}
          </ul>
        </div>
         {/* This is the logged in user icon with logout and everything */}
        {auth ? (<div className="flex items-center relative">
         
          <div className="dropdown relative">
            <ul
              className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
              aria-labelledby="dropdownMenuButton1"
            >
              {!auth && (<li>
                <a
                  className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  href="#"
                >
                  Logout
                </a>
              </li>)}
              
            </ul>
          </div>
          <div className="dropdown relative">
            <a
              className="dropdown-toggle flex items-center hidden-arrow"
              href="#"
              id="dropdownMenuButton2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                className="rounded-full h-[25px] w-[25px]"
                alt=""
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <a
                  className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                  href="#"
                >
                  Logout
                </a>
              </li>
              
            </ul>
          </div>
        </div>) : (
          <div className="flex items-center relative">
            <button
              className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
