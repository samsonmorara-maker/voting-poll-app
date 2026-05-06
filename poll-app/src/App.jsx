
import React, { useState, useEffect } from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";
import Navbar from "./components/Navbar";
import "./index.css";
import Loading from "./components/Loading";
import Login from "./components/Login"; // <--- ADD THIS LINE
import {auth} from "./firebase"; // <--- ADD THIS LINE
import { onAuthStateChanged, signOut } from "firebase/auth"; // <--- ADD THIS LINE

import { db } from "./firebase";
import {
  increment,
  onSnapshot,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  writeBatch, 
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
    const exists = options.some(
      (opt) => opt.text.toLowerCase() === text.toLowerCase(),
    );
    if (exists) {
      alert("Option already exists!");
      return;
    }

    setOptions([...options, newOption]);
  };

  const handleVote = async (id) => {
    try {
      const activeVoterId = user ? user.uid : voterId;

      const votesRef = collection(db, "votes");
      const q = query(votesRef, where("voterId", "==", activeVoterId));
      const voteQuerySnapshot = await getDocs(q);

      if (!voteQuerySnapshot.empty) {
        alert("You have already cast your one allowed vote!");
        return;
      }

      const optionRef = doc(db, "options", id);
      await updateDoc(optionRef, { votes: increment(1) });

    const updated = options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt,
    );

    } catch (error) {
      console.error("VOTE ERROR:", error);
    }
  };

  const addOption = async (text) => {
    const id = text.toLowerCase().replace(/\s+/g, "-");
    const optionRef = doc(db, "options", id);
    const existing = await getDoc(optionRef);
    if (existing.exists()) {
      alert("Option already exists!");
      return;
    }
    await setDoc(optionRef, { text, votes: 0 });
  };

 
  const resetVotes = async () => {
  try {
    const activeVoterId = user.uid;

    const votesRef = collection(db, "votes");
    const q = query(votesRef, where("voterId", "==", activeVoterId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert("You have not voted yet");
      return;
    }

    const batch = writeBatch(db);

    snapshot.forEach((voteDoc) => {
      const voteData = voteDoc.data();
      const optionRef = doc(db, "options", voteData.optionId);
      batch.update(optionRef, {
        votes: increment(-1),
      });
      batch.delete(voteDoc.ref);
    });

    await batch.commit();

    alert("Your vote has been reset!");
  } catch (error) {
    console.error("RESET ERROR:", error);
  }
};
if (loading) return <Loading />;
  if (!user) {
    return <Login />;
  }
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-4">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Poll App
          </h1>
          <PollForm addOption={addOption} />
          <PollList options={options} handleVote={handleVote} />
          <button
            onClick={resetVotes}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Reset Votes
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
