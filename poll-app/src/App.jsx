import React, { useState, useEffect } from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";
import Navbar from "./components/Navbar";
import "./index.css";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";



 const App = () => {
  const defaultOptions = [
  { id: 1, text: "React", votes: 0 },
  { id: 2, text: "Vue", votes: 0 },
  { id: 3, text: "Angular", votes: 0 },
];

 const [options, setOptions] = useState(() => {
  return JSON.parse(localStorage.getItem("options")) || defaultOptions;
});

const [hasVoted, setHasVoted] = useState(() => {
  return JSON.parse(localStorage.getItem("hasVoted")) || false;
});

  useEffect(() => {
  const savedOptions = JSON.parse(localStorage.getItem("options"));
  const savedVote = JSON.parse(localStorage.getItem("hasVoted"));
 
   if (savedOptions) {
    setOptions(savedOptions);
  }

  if (savedVote !== null) {
    setHasVoted(savedVote);
  }
}, []);

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
    localStorage.setItem("hasVoted", JSON.stringify(hasVoted));
  }, [options, hasVoted]);
 
  const addOption = (text) => {
    const newOption = {
      id: Date.now(),
      text,
      votes: 0,
    };
    const exists = options.some((opt) => opt.text.toLowerCase() === text.toLowerCase());
    if (exists) {
      alert("Option already exists!");
      return;
    }

    setOptions([...options, newOption]);
  };

  const handleVote = (id) => {
    if (hasVoted) return;

    const updated = options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    );

    setOptions(updated);
    setHasVoted(true);
  };

  const resetVotes = () => {
    const reset = options.map((opt) => ({ ...opt, votes: 0 }));
    setOptions(reset);
    setHasVoted(false);
  };
 

  return (
    <>
    <Navbar />
     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        
        
        <h1 className="text-10xl font-bold text-center text-blue-600 mb-6">
          Poll App
        </h1>

        <PollForm addOption={addOption} />

        <PollList
          options={options}
          handleVote={handleVote}
          hasVoted={hasVoted}
        />

        <button
          onClick={resetVotes}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Reset Votes
        </button>
      </div>
    </div>
  

   </>);
}
export default App;
