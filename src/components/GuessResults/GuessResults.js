import React from 'react';

import Guess from '../Guess';

function GuessResults({ guesses }) {
  return (
    <div className="guest-results">
      {guesses.map((guess) => (
        <Guess key={guess.id} guess={guess} />
      ))}
    </div>
  );
}

export default GuessResults;
