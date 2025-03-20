import React from "react";
import MainLayout from "../../layouts/LandingLayout";
import FounderCard from "../../components/FounderCard";
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";

export default function AboutPage() {
  return (
    <>
      <div className="w-full h-[800px] my-7 flex flex-col justify-center text-center p-10 shadow-2xl bg-white">
        <div>
          <h1 className="text-5xl text-blue-500">AskQuestion </h1> <br />
          <p className="text-xl text-gray-700">
            AskQuestion is an interactive web platform designed to help users
            ask and answer questions across a wide range of topics. Whether
            you’re seeking expert advice, troubleshooting a technical issue, or
            simply looking to expand your knowledge, AskQuestion provides a
            user-friendly space for meaningful discussions. <br /> <br /> Our
            platform is built to foster a collaborative community where
            curiosity thrives, and knowledge is freely exchanged. With intuitive
            features, real-time responses, and a diverse group of contributors,
            you can find reliable answers to your questions quickly and
            efficiently. Whether you’re a student, professional, or hobbyist,
            AskQuestion empowers you to both learn and contribute by sharing
            your expertise. <br /> <br /> Join us today to ask, learn, and
            connect with a community that values curiosity and the pursuit of
            knowledge!
          </p>
        </div>
      </div>
      <div className="w-full h-[800px] mt-7 mb-9 p-10 shadow-2xl bg-white">
        <h1 className="text-center text-5xl text-blue-500">Founders</h1>
        <div className="flex  justify-around text-center">
          <FounderCard
            img={p1}
            name="Ayahusu Thami"
            title="Founder, CEO & CTO of AskQuestion."
            description="Passionate about technology and innovation, leading the platform’s vision and technical development."
            email="ayahusu@gmail.com"
          />
          <FounderCard
            img={p2}
            name="Award Dhakal"
            title="Founder & COO of AskQuestion, and Head of Community."
            description="Dedicated to driving growth, managing operations, and fostering an engaged community of knowledge seekers."
          />
        </div>
      </div>
    </>
  );
}
