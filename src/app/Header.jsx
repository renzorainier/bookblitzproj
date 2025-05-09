"use client";

import React from "react";
import { FaFacebook, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Image from "next/image"; // Import Image from next/image

const Header = ({ userData }) => {
  if (!userData) return null;

  const { name, imageUrl, contactNumber, email, facebookLink, jobSkillset } = userData;

  return (
    <div className="flex flex-col">
      {/* Gradient Section */}
      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-blue-500 p-40 text-white">
        {/* Placeholder for gradient content */}
      </div>

      {/* White Details Section */}
      <div className="bg-white p-6 pt-2 -mt-16">
        {/* Profile Section */}
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <div className="relative -mt-20">
            <Image
              src={imageUrl}
              alt={`${name}'s profile`}
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
              width={128}  // Specify the width
              height={128} // Specify the height
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{name}</h1>

            {/* Icons for Contact Info */}
            <div className="flex space-x-6 mt-3 text-black">
              {facebookLink && (
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-blue-600 transition duration-300">
                  <FaFacebook className="text-xl text-red-500" />
                  <span>Facebook</span>
                </a>
              )}

              {contactNumber && (
                <a
                  href={`tel:${contactNumber}`}
                  className="flex items-center space-x-2 hover:text-green-500 transition duration-300">
                  <FaPhoneAlt className="text-xl text-red-500" />
                  <span>Phone</span>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center space-x-2 hover:text-purple-500 transition duration-300">
                  <FaEnvelope className="text-xl text-red-500" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {jobSkillset?.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold text-black ">Job Skill Sets:</h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {jobSkillset.map((skill, index) => (
                <li
                  key={index}
                  className="bg-gray-100 text-black py-2 px-4 rounded-full shadow-sm text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
