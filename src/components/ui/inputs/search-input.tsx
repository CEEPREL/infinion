import React from "react";

const SearchInput: React.FC = () => {
  return (
    <label htmlFor="Search" className="block">
      <div className="relative">
        <input
          type="text"
          id="Search"
          name="search"
          placeholder="Search"
          className="mt-0.5 pl-8 border-2  py-4 h-10 w-full sm:text-sm dark:border-hover dark:bg-hover rounded-3xl dark:text-white"
        />

        <span className="absolute inset-y-0 left-1 grid w-8 place-content-center">
          <button
            type="button"
            aria-label="Submit"
            className="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </label>
  );
};

export default SearchInput;
