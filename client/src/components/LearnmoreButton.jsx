import React from "react";

export default function LearnmoreButton({ name = "Learn More" }) {
  return (
    <button className="w-30 h-10 my-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      {name}
    </button>
  );
}
