import React from "react";
import { Link } from "react-router-dom";
import LearnmoreButton from "./LearnmoreButton";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function FounderCard(props) {
  return (
    <div className="w-[300px] h-[600px] my-10 shadow-2xl rounded-xl">
      <img
        src={props.img}
        alt="Founder"
        className="w-full h-[300px] rounded-t-xl"
      />
      <div className="p-2 h-44">
        <h1 className="font-bold text-xl">{props.name}</h1>
        <p>{props.title}</p>
        <span>{props.description}</span>
      </div>
      <LearnmoreButton />
      <div className="border-t-2 border-gray-400 flex justify-center gap-4 py-4">
        <a href="" className="text-xl text-blue-600">
          <FaFacebook />
        </a>
        <a href="" className="text-xl">
          <FaSquareXTwitter />
        </a>
        <a href="" className="text-xl">
          <FaGithub />
        </a>
        <a href={`mailtp:${props.email}`} className="text-xl text-red-500">
          <IoMail />
        </a>
      </div>
    </div>
  );
}
