import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

import { range } from '../../utils';
import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState(initialGuesses());
  const [numberOfGuesses, setNumberOfGuesses] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState('');

  function initialGuesses() {
    return range(NUM_OF_GUESSES_ALLOWED).map(() => ({
      id: Math.random(),
      word: range(5).map(() => ({ letter: '', status: '' })),
    }));
  }

  function isGameOver(guessedWord) {
    const nextNumberOfGuesses = numberOfGuesses + 1;
    setNumberOfGuesses(nextNumberOfGuesses);

    if (guessedWord.every((letter) => letter.status === 'correct')) {
      setGameStatus('won');
      return;
    }

    if (nextNumberOfGuesses === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
      return;
    }
  }

  function handleSubmitGuess(guess) {
    const nextGuesses = [...guesses];
    const checkedGuess = checkGuess(guess, answer);

    const nextEmptyGuess = nextGuesses.find(
      (guess) => guess.word[0].letter === ''
    );

    if (!nextEmptyGuess) {
      return;
    }

    nextGuesses[nextGuesses.indexOf(nextEmptyGuess)] = {
      ...nextEmptyGuess,
      word: checkedGuess,
    };

    setGuesses(nextGuesses);
    isGameOver(checkedGuess);
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInput
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={!!gameStatus}
      />
      {gameStatus === 'won' && <WonBanner numberOfGuesses={numberOfGuesses} />}
      {gameStatus === 'lost' && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
