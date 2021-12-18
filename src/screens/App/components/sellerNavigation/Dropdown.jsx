import React from "react";
import { Link } from "react-router-dom";

function Dropdown({ name, links }) {
  return (
    <div
      className="w-52 dropdown-menu 
        absolute right-0 z-50 
        hidden
        transition duration-300 ease-linear 
        group-hover:block"
    >
      <div
        className="w-full bg-my-white-tint mt-1
          flex flex-col
          shadow rounded-md
          border border-gray-200"
      >
        <div className="px-2 py-1.5">
          <p className="text-gray-600 font-medium">{name}</p>
        </div>

        <div className="border-b-2 border-gray-300"></div>

        {Object.entries(links).map(([k, v]) => (
          <DropdownLink key={k} name={v.name} to={v.to} svgD={v.svgD} />
        ))}
      </div>
    </div>
  );
}

export default Dropdown;

function DropdownLink({ name, to, svgD }) {
  return (
    <Link
      to={to}
      className="text-gray-900 inline-flex gap-2
        m-1 px-2 py-1.5 
        rounded
        transition ease-linear
        hover:bg-gray-200
        active:text-my-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
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

      <span className="font-semibold text-sm">{name}</span>
    </Link>
  );
}
