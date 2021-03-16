import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const Nav = ({ history }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Company
            </span>
          </a>
          {history.location.pathname === "/" && (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <a
                  href="#products"
                  aria-label="Our products"
                  title="Our products"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  aria-label="Our features"
                  title="Our features"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#about-us"
                  aria-label="About us"
                  title="About us"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  About us
                </a>
              </li>
            </ul>
          )}
        </div>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <Link
              to="/cart"
              aria-label="Cart"
              title="Cart"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Cart{"  "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 inline"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  points="4,4 22,4 19,14 4,14 "
                />
                <circle
                  cx="4"
                  cy="22"
                  r="2"
                  strokeLinejoin="miter"
                  strokeLinecap="square"
                  stroke="none"
                  fill="currentColor"
                />
                <circle
                  cx="20"
                  cy="22"
                  r="2"
                  strokeLinejoin="miter"
                  strokeLinecap="square"
                  stroke="none"
                  fill="currentColor"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  points="1,1 4,4 4,14 2,18 23,18 "
                />
              </svg>
            </Link>
          </li>
          {!isAuthenticated() && (
            <>
              <li>
                <Link
                  to="/signin"
                  aria-label="Sign in"
                  title="Sign in"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
          {((isAuthenticated() && isAuthenticated().user.role === 0) ||
            history.location.pathname === "/admin/dashboard") && (
            <li>
              <Link
                to="/user/dashboard"
                aria-label="Dashboard"
                title="Dashboard"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                User Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() &&
            isAuthenticated().user.role === 1 &&
            history.location.pathname !== "/admin/dashboard" && (
              <li>
                <Link
                  to="/admin/dashboard"
                  aria-label="Admin Dashboard"
                  title="Admin Dashboard"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          {isAuthenticated() && (
            <li>
              <Link
                to="/"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign out"
                title="Sign out"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Sign out
              </Link>
            </li>
          )}
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-8 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Company
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {history.location.pathname === "/" && (
                      <>
                        <li>
                          <a
                            href="#products"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Products
                          </a>
                        </li>
                        <li>
                          <a
                            href="#features"
                            aria-label="Our features"
                            title="Our features"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Features
                          </a>
                        </li>
                        <li>
                          <a
                            href="#about-us"
                            aria-label="About us"
                            title="About us"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            About us
                          </a>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to="/cart"
                        aria-label="Cart"
                        title="Cart"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Cart{"  "}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 inline"
                        >
                          <polyline
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            points="4,4 22,4 19,14 4,14 "
                          />
                          <circle
                            cx="4"
                            cy="22"
                            r="2"
                            strokeLinejoin="miter"
                            strokeLinecap="square"
                            stroke="none"
                            fill="currentColor"
                          />
                          <circle
                            cx="20"
                            cy="22"
                            r="2"
                            strokeLinejoin="miter"
                            strokeLinecap="square"
                            stroke="none"
                            fill="currentColor"
                          />
                          <polyline
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            points="1,1 4,4 4,14 2,18 23,18 "
                          />
                        </svg>
                      </Link>
                    </li>
                    {!isAuthenticated() && (
                      <>
                        <li>
                          <Link
                            to="/signin"
                            aria-label="Sign in"
                            title="Sign in"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Sign in
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
                          </Link>
                        </li>
                      </>
                    )}
                    {((isAuthenticated() &&
                      isAuthenticated().user.role === 0) ||
                      history.location.pathname === "/admin/dashboard") && (
                      <li>
                        <Link
                          to="/user/dashboard"
                          aria-label="Dashboard"
                          title="Dashboard"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          User Dashboard
                        </Link>
                      </li>
                    )}
                    {isAuthenticated() &&
                      isAuthenticated().user.role === 1 &&
                      history.location.pathname !== "/admin/dashboard" && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            aria-label="Admin Dashboard"
                            title="Admin Dashboard"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                      )}
                    {isAuthenticated() && (
                      <li>
                        <Link
                          to="/"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign out"
                          title="Sign out"
                          onClick={() => {
                            signout(() => {
                              history.push("/");
                            });
                          }}
                        >
                          Sign out
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Nav);
