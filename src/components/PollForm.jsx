import React, { useState } from "react";

const PollForm = ({ addOption }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    // prevents reload after submission
    e.preventDefault();

    // prevents adding of empty options
    if (!input.trim()) return;
    // it does not store the option in the state, it just passes the input value to the addOption function which is defined in the App component
    //  and is responsible for adding the new option to the options state.
    addOption(input);
    // clears the input field after submission
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter poll option"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button className="bg-green-500 hover:bg-blue-600 text-white px-4 rounded-lg">
        Add
      </button>
    </form>
  );
};

export default PollForm;
// it only captures the input value and passes it to the addOption function when the form is submitted. 
// The actual logic for adding the option to the poll is handled in the App component, which maintains 
// the state of all poll options.