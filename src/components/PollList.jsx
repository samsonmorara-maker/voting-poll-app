import React from "react";
import PollOption from "./PollOption";

const PollList = ({ options, handleVote, hasVoted }) => {
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <PollOption
          key={opt.id}
          option={opt}
          totalVotes={totalVotes}
          handleVote={handleVote}
          hasVoted={hasVoted}
        />
      ))}
    </div>
  );
};

export default PollList;