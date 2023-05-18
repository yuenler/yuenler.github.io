import React, { useState, useEffect, useRef } from 'react';
import dance from './images/dance.jpg';
import marathon from './images/marathon.jpg';
import magic from './images/magic.jpg';
import quidditch from './images/quidditch.jpg';
import chef from './images/chef.jpg';
import stem from './images/stem.jpg';
import app from './images/app.jpg';
import siblings from './images/siblings.jpg';
import './App.css';
import LearnMore from './LearnMore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const phrases = [
  {
    phrase: 'middle child',
    image: siblings
  },
  {
    phrase: 'website and app builder',
    image: app
  },
  {
    phrase: 'STEM educator',
    image: stem
  },
  {
    phrase: 'dancer',
    image: dance
  },
  {
    phrase: 'Quidditch player',
    image: quidditch
  },
  {
    phrase: 'magician',
    image: magic
  },
  {
    phrase: 'marathon runner',
    image: marathon
  },
  {
    phrase: 'chef',
    image: chef
  }
]


function App() {


  const [typingText, setTypingText] = useState("");
  const [image, setImage] = useState(phrases[0].image);
  const cursorRef = useRef(null);

  const scrollRef = useRef(null);

  const handleScroll = () => {
    const { current } = scrollRef;
    if (current) {
      current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  useEffect(() => {

    window.history.scrollRestoration = 'manual'

    const cursor = cursorRef.current;
    let direction = 1;
    let phraseIdx = 0;
    let sentence = phrases[phraseIdx].phrase;
    let cursorPos = 0;
    let blinking = false;
    let blinkIntervals = 0;

    const switchDirection = () => {
      direction *= -1;
      toggleTyping();
      if (direction === 1) {
        /* Just started typing again, time to switch phrase */
        phraseIdx++;
        if (phraseIdx >= phrases.length) { phraseIdx = 0; }
        sentence = phrases[phraseIdx].phrase;
        setImage(phrases[phraseIdx].image);
      }
    };

    const toggleTyping = () => {
      blinking = !blinking;
      if (blinking) { cursor.classList.add('blink') } else { cursor.classList.remove('blink'); }
    }

    const intervalId = setInterval(() => {
      const atStart = cursorPos === 0;
      const atEnd = cursorPos === sentence.length;
      if ((atStart && direction === -1) || (atEnd && direction === 1)) { switchDirection(); }

      if (!blinking) {
        cursorPos += direction;
        setTypingText(sentence.slice(0, cursorPos));
      } else {
        blinkIntervals++;
        if (blinkIntervals >= 12) {
          blinkIntervals = 0;
          toggleTyping();
        }
      }
    }, 90);

    return () => {
      clearInterval(intervalId);
    };

  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: 20 }}>
          <img src={image} className="profilePic"
            alt="Yuen Ler"
          />
        </div>
        <h1>Hello 👋! I'm Yuen Ler.</h1>
        <div>
          <span style={{ fontSize: 30 }}>I am a </span><span style={{ fontSize: 30 }}>{`${typingText}`}</span><span
            ref={cursorRef} className="blink" style={{ fontSize: 30 }}>|</span>
        </div>
        <button onClick={handleScroll} className="hoverButton">
          <p>Learn More</p> <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </header >
      <div ref={scrollRef}>
        <LearnMore />
      </div>
    </div >
  );
}

export default App;
