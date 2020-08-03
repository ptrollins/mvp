import React, { useState, useEffect } from 'react';
import Speech from './speech/Speech';

import climber from '../assets/images/climber.png';
import board from '../assets/images/kids-whiteboard.png';

const Game = () => {
  const style = {
    container: {},
    text: {
      width: '100px',
      height: '100px',
      fontSize: '2.4rem',
    },
    play: {
      hover: {
        color: '#00e676',
        backgroundColor: '#ffffff',
      },
      button: {
        width: '34',
        height: '34',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: '#ffffff',
        color: 'black',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6,
      },
    },
    stop: {
      hover: {
        backgroundColor: 'GhostWhite',
      },
      button: {
        width: '34',
        height: '34',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        color: 'red',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6,
      },
    },
    pause: {
      hover: {
        backgroundColor: 'GhostWhite',
      },
      button: {
        width: '34',
        height: '34',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        color: 'black',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6,
      },
    },
    resume: {
      hover: {
        backgroundColor: 'GhostWhite',
      },
      button: {
        width: '34',
        height: '34',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        color: 'Gainsboro',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6,
      },
    },
  };

  const levels = {
    cvc: [
      ['bat', 'cat', 'fat', 'hat', 'mat', 'pat', 'rat', 'sat'],
      ['cot', 'dot', 'got', 'hot', 'lot', 'not', 'pot', 'rot'],
      ['fit', 'hit', 'kit', 'lit', 'pit', 'sit'],
      ['ban', 'can', 'fan', 'man', 'pan', 'ran', 'tan'],
      ['dip', 'hip', 'lip', 'nip', 'rip', 'sip', 'tip', 'zip'],
      ['cap', 'gap', 'lap', 'map', 'nap', 'rap', 'sap', 'tap', 'zap'],
    ],
    ccvc: [],
  };

  const phrases = {
    help: `I'm stuck in the well. Who can help me out by finding the word {0}?`,
    found: `Great! You found {0}`,
    repeat: `Find {0}`,
    complete: `...Thanks for helping me get out of the well!`,
  };

  const [words, setWords] = useState([]);
  const [wordsLeft, setWordsLeft] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    updateWords();
  }, []);

  useEffect(() => {
    setCurrentWord(
      wordsLeft.length ? wordsLeft[getRandom(wordsLeft.length)] : '0'
    );
    renderWords();
  }, [wordsLeft]);

  useEffect(() => {
    if (currentWord === '0') {
      setPhrase(format(phrases.complete));
    } else {
      setPhrase(format(phrases.help, currentWord));
    }
  }, [currentWord]);

  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };

  const swap = (firstIndex, secondIndex, array) => {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  };

  const shuffle = (array) => {
    let randomIndex;
    for (let i = 0; i < array.length; i++) {
      randomIndex = i + getRandom(array.length - i);
      swap(i, randomIndex, array);
    }

    return array;
  };

  const format = (template, ...args) => {
    for (let index in args) {
      template = template.replace(
        new RegExp('\\{' + index + '\\}', 'g'),
        args[index]
      );
    }
    return template;
  };

  const updateWords = () => {
    let wordsLeftArray = shuffle(
      levels.cvc[getRandom(levels.cvc.length)]
    ).slice(0, 6);
    let wordsArray = wordsLeftArray.map((word) => {
      return { word: word, disabled: false };
    });
    setWords(wordsArray);
    setWordsLeft(wordsLeftArray);
  };

  const checkWord = (text) => {
    let phrase = text;
    let checkWordsLeft = true;
    let checkWords = true;
    let newWordsLeft = [];
    if (text === currentWord) {
      for (let i = 0; i < words.length; i++) {
        if (
          checkWordsLeft &&
          wordsLeft[i] !== undefined &&
          text === wordsLeft[i]
        ) {
          newWordsLeft = wordsLeft.slice();
          newWordsLeft.splice(i, 1);
          setWordsLeft(newWordsLeft);
          checkWordsLeft = false;
        }
        if (checkWords && text === words[i].word) {
          setWords([
            ...words.slice(0, i),
            {
              ...words[i],
              disabled: true,
            },
            ...words.slice(i + 1),
          ]);
          checkWords = false;
        }
      }
      phrase = format(phrases.found, text);
      if (wordsLeft.length < 2) {
        phrase += format(phrases.complete);
      }
    }

    return phrase;
  };

  const renderWords = () => {
    return words.map((word, i) => {
      return (
        <div
          key={word.word}
          style={{ top: `${(i + 1) * 60}px`, left: `${getRandom(30) + 33}%` }}
        >
          <Speech
            text={word.word}
            styles={style}
            textAsButton={true}
            pitch="1.1"
            rate="0.7"
            volume="0.3"
            lang="en-US"
            disabled={word.disabled}
            voice="Google US English"
            checkWord={checkWord}
          >
            {word.word}
          </Speech>
        </div>
      );
    });
  };

  return (
    <div className="content">
      <section className="character-section">
        <div id="well">
          <img src={climber} />
        </div>
        <div className="controls">
          <Speech
            text={phrase}
            styles={style}
            textAsButton={true}
            pitch="1.1"
            rate="0.7"
            volume="0.3"
            lang="en-US"
            voice="Google US English"
          />
        </div>
      </section>
      <section className="word-board">
        <div id="white-board">
          <img src={board} />
          {renderWords()}
        </div>
      </section>
    </div>
  );
};

export default Game;
