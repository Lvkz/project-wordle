import React from 'react';

function Guess({ guess }) {
  return (
    <p className="guess">
      {guess.word.map(({ letter, status }, index) => (
        <span key={`${guess.id}-${index}`} className={`cell ${status}`}>
          {letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
