/*
 * This component is a standard design for login and sign up input field
 *
 */

import React from "react";

function InputField({ type, name, label, error, value, onChange, svgD }) {
  const errorValues = error ? "border-red-500" : "border-gray-100";

  return (
    <div className="flex flex-col space-y-0.5">
      <div className="flex justify-between items-center">
        <label className="font-semibold text-sm text-gray-500">{label}</label>
        <label className="text-red-400 text-sm font-medium">{error}</label>
      </div>

      <div
        className={`transition duration-300 inline-flex shadow-md rounded-md h-11 items-center px-3 space-x-2 bg-gray-100 border  ${errorValues}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={"h-6 w-6 text-my-accent " + (!svgD ? "hidden" : "")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={svgD}
          />
        </svg>

        <input
          name={name}
          type={type}
          className="w-full focus:outline-none bg-gray-100"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default InputField;
