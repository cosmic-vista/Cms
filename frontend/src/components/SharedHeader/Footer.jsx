import React from "react";
import { Link } from "react-router-dom";
import { footerdata } from "@/assets/footerdata";

const Footer = () => {
  return (
    <div className="bg-black text-white py-10 w-full ">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className=" text-gray-400 text-sm font-medium">
            {footerdata.about}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          {footerdata.links.map((link, id) => (
            <li
              key={id}
              className="text-gray-400 text-sm  mb-2 hover:text-red-500"
            >
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>

          <p className="text-gray-400 text-sm">{footerdata.contact.address}</p>

          <p className="text-gray-400 text-sm">
            Email: {footerdata.contact.email}
          </p>

          <p className="text-gray-400 text-sm">
            Phone:{footerdata.contact.phone}
          </p>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        <p>Follow us on:</p>

        <div className="flex justify-center space-x-4 mt-3">
          {footerdata.social.map((handel, id) => (
            <a key={id} href="#" className="text-gray-400 hover:text-gray-100">
              {handel}
            </a>
          ))}
        </div>

        <p className="mt-4 font-semibold text-xl ">
          {" "}
          &copy; {new Date().getFullYear()} All rights reserved.{" "}
          {footerdata.copyright}
        </p>
      </div>
    </div>
  );
};

export default Footer;
