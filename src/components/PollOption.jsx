import React from "react";

const PollOption = ({ option, totalVotes, handleVote, hasVoted }) => {
  const percentage =
    totalVotes === 0 ? 0 : ((option.votes / totalVotes) * 100).toFixed(1);

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{option.text}</h3>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-indigo-500 h-4 rounded-full text-xs text-white flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {option.votes} votes
        </span>

        <button
          onClick={() => handleVote(option.id)}
          disabled={hasVoted}
          className={`px-3 py-1 rounded-lg text-white transition
            ${
              hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default PollOption;