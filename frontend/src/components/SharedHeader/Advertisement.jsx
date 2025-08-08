import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex flex-col md:flex-row p-3 border border-teal-600 rounded-tl-3xl rounded-br-3xl text-center">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        aria-label="Close advertisement"
      >
        ✕
      </button>

      <div className="flex-1 justify-center flex flex-col p-3 w-full font-semibold space-y-6">
        <h1>Here you can advertise your product</h1>
        <p className="text-gray-800 font-serif text-sm">
          Check out these product
        </p>

        <iframe
          className="w-full h-48 md:h-60"
          src="https://www.youtube.com/embed/BSJa1UytM8w?list=RDBSJa1UytM8w"
          title="Saiyaara Title Song | Ahaan Panday, Aneet Padda"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>

        <Button className="bg-blue-500 text-md mt-4 h-min">
          <Link
            to="https://www.amazon.in/2022-Apple-MacBook-Laptop-chip/dp/B0DLHFM2XL/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wrap"
          >
            Go-to resources
          </Link>
        </Button>
      </div>

      <div className="p-7 w-full md:w-2/5">
        <img
          src="https://m.media-amazon.com/images/I/817vlJN0yyL._SX679_.jpg"
          alt="Advertisement"
          className="w-full h-60 object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default Advertisement;
