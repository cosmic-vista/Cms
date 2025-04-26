import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Advertisement = () => {
  return (
    <div className="flex flex-col md:flex-row p-3 border border-teal-600 items-center justify-center rounded-tl-3xl rounded-br-3xl  text-center">
      <div className="flex-1  justify-center flex flex-col p-3 w-full font-semibold text-wrap space-y-12">
        <h1>Here you can adverstise your product</h1>
        <p className="text-gray-800 font-serif text-sm">
          Check out these product
        </p>

        <Button className="bg-blue-500 text-md mt-4 h-min">
          <Link
            to="https://www.amazon.in/2022-Apple-MacBook-Laptop-chip/dp/B0DLHFM2XL/ref=sr_1_1?crid=72B5QZL4QJOT&dib=eyJ2IjoiMSJ9.Pdvkm5Lh9HgKoCfHNpZm1Rs4KA2I_lUAv3UECqDgVI1qWx0fr90jSvm6kJFCxh3eCSE71uaAsv1iFi8GYAQzkBibyP0FYWmRD7Ew5nbVEwgKrTINaDi5RxkU9_dBiUXq20g_d4-uLnIk1wK2bw6WlcMGyIO3tMVpU4H7MUgHIg4NdtH-uJBxQCFyjvsXOREfH0qoSYHuDXyh9p-WrSsB2KE4ARaOTSoti6v9au5Qick.PYMHpXJEHGQKKgbkYUAQL8XffieCMDFJDasGqgKUNTQ&dib_tag=se&keywords=air+m2&qid=1745652583&sprefix=air+m2%2Caps%2C224&sr=8-1"
            target="_blank"
            rel="noopener norefferer"
            className=" text-wrap"
          >
            Go-to resources
          </Link>
        </Button>
      </div>
      <div className="p-7 w-full md:w-2/5">
        <img
          src="https://m.media-amazon.com/images/I/817vlJN0yyL._SX679_.jpg"
          className="w-full h-60 "
        />
      </div>
    </div>
  );
};

export default Advertisement;
