import React from "react";
import Button from "../../../../../../../../../shared/Components/button/Button";
import { ProductCardDisplay } from "./utils/ProductCard";

function SelectedProduct() {
  return (
    <div className="space-y-10">
      <ProductCardDisplay />

      <div className="space-y-8">
        <ProductRating />

        <div>
          <p>Comments</p>
          <textarea
            type="text"
            className="w-full rounded-md bg-gray-100 h-2/5 p-3"
            placeholder="Share us your thoughts about this product"
            rows="7"
          ></textarea>
        </div>

        {/* CTA */}
        <Button
          isLoading={false}
          buttonClass="transition bg-my-accent px-14 py-3 rounded-md shadow text-my-contrast font-medium text-lg hover:bg-my-accent-mono"
        >
          Submit Rating
        </Button>
      </div>
    </div>
  );
}
export default SelectedProduct;

function ProductRating() {
  return (
    <div>
      <p>Product Rating</p>
      <div className="flex flex-row gap-3">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
    </div>
  );
}

function Star({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-16 w-16 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}
