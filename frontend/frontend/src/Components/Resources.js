import React, { useState } from 'react';
import { FaYoutube, FaGlobe, FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Resources({ sectionClasses }) {
  const [showYouTube, setShowYouTube] = useState(false);
  const [showWebsites, setShowWebsites] = useState(false);
  const [showInterviewQuestions, setShowInterviewQuestions] = useState(false);

  const youtubeChannels = [
    { name: "Telusko (Java Programming Playlist)", url: "https://www.youtube.com/watch?v=bm0OyhwFDuY&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=1" },
    { name: "freeCodeCamp.org (Java Courses Playlist)", url: "https://www.youtube.com/watch?v=A74TOX803D0" },
    { name: "Programming with Mosh", url: "https://www.youtube.com/watch?v=eIrMbAQSU34&t=2s" },
    { name: "Amigoscode", url: "https://www.youtube.com/watch?v=Qgl81fPcLc8&t=1s" },
    { name: "Kunal Kushwaha (DSA + Java)", url: "https://www.youtube.com/watch?v=BSVKUk58K6U&list=PL9gnSGHSqcno1G3XjUbwzXHL8_EttOuKk" },
  ];

  const learningWebsites = [
    { name: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" },
    { name: "JavaTpoint", url: "https://www.tpointtech.com/java-tutorial" },
    { name: "W3Schools Java", url: "https://www.w3schools.com/java/" },
    { name: "Oracle Docs", url: "https://docs.oracle.com/en/java/" },
    { name: "TutorialsPoint Java", url: "https://www.tutorialspoint.com/java/index.htm" },
    { name: "BeginnersBook", url: "https://beginnersbook.com/java-tutorial-for-beginners-with-examples/" },
  ];

  const interviewQuestions = [
    { name: "InterviewBit Java Qs", url: "https://www.interviewbit.com/java-interview-questions/" },
    { name: "GFG Java Qs", url: "https://www.geeksforgeeks.org/java-interview-questions/" },
    { name: "Scribd Qs", url: "http://scribd.com/document/619168441/Java-Interview-JavaTpoint" },
    { name: "Simplilearn Qs", url: "https://www.simplilearn.com/tutorials/java-tutorial/java-architect-interview-questions" },
    { name: "Digital Ocean Java Qs", url: "https://www.digitalocean.com/community/tutorials/java-interview-questions" },
    { name: "Turing Qs", url: "https://www.turing.com/interview-questions/java" },
    { name: "Great Learning Qs", url: "https://www.mygreatlearning.com/blog/java-interview-questions/" },
  ];

  const renderResourceList = (resources, IconComponent) => (
    <ul className="space-y-3 mt-6 text-left px-3 animate-fade-in">
      {resources.map((res, idx) => (
        <li key={idx} className="flex items-center gap-3 group transition-transform hover:translate-x-1">
          <IconComponent className="text-xl text-cyan-600 group-hover:text-purple-600" />
          <a href={res.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-800 hover:text-fuchsia-700 hover:underline">
            {res.name}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative ${sectionClasses} py-20 px-6 text-center bg-gradient-to-br from-[#eef2ff] to-[#e0f7fa]`}>
      {/* Floating blur background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 opacity-30 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-300 opacity-30 blur-3xl rounded-full z-0"></div>

      <div className="relative z-10">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-600 drop-shadow-lg mb-4">
          Java Skill Resources Hub
        </h2>
        <p className="text-lg font-medium text-gray-700 mb-16 max-w-2xl mx-auto">
          Discover high-quality Java learning platforms, interactive tutorials, and prepare for job interviews with real-world questions.
        </p>

        {/* Cards */}
        {[{
          title: 'Top YouTube Channels',
          icon: FaYoutube,
          toggle: showYouTube,
          setToggle: setShowYouTube,
          list: youtubeChannels,
          color: 'from-red-400 to-pink-500'
        }, {
          title: 'Best Java Learning Websites',
          icon: FaGlobe,
          toggle: showWebsites,
          setToggle: setShowWebsites,
          list: learningWebsites,
          color: 'from-blue-400 to-emerald-500'
        }, {
          title: 'Java Interview Questions',
          icon: FaQuestionCircle,
          toggle: showInterviewQuestions,
          setToggle: setShowInterviewQuestions,
          list: interviewQuestions,
          color: 'from-green-400 to-sky-500'
        }].map((card, idx) => (
          <div key={idx} className="bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-8 my-8 mx-auto max-w-3xl transition-all hover:scale-[1.01] hover:shadow-2xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <card.icon className="text-3xl text-gray-700" />
              {card.title}
            </h3>
            <button
              onClick={() => card.setToggle(!card.toggle)}
              className={`mt-4 inline-flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-full bg-gradient-to-r ${card.color} hover:scale-105 transition`}
            >
              {card.toggle ? "Hide" : "Show"} Resources
              {card.toggle ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {card.toggle && renderResourceList(card.list, card.icon)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
