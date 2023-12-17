import React, { useState, useEffect, useRef } from 'react';
import dance from './images/dance.jpg';
import marathon from './images/marathon.jpg';
import magic from './images/magic.jpg';
import quidditch from './images/quidditch.jpg';
import chef from './images/chef.jpeg';
import stem from './images/stem.jpg';
import app from './images/app.jpeg';
import siblings from './images/siblings.jpeg';
import hackathon from './images/hackathon.jpeg';
import './App.css';
// import LearnMore from './LearnMore';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DistanceCalculator from './DistanceCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import { useSprings, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

const phrases = [
  {
    phrase: 'chef',
    image: chef
  },
  {
    phrase: 'marathon runner',
    image: marathon
  },
  // {
  //   phrase: 'magician',
  //   image: magic
  // },
  // {
  //   phrase: 'Quidditch player',
  //   image: quidditch
  // },

  {
    phrase: 'dancer',
    image: dance
  },
  {
    phrase: 'tiny tot teacher',
    image: stem
  },
  {
    phrase: 'hackathon director',
    image: hackathon
  },
  {
    phrase: 'software engineer',
    image: app
  },
  {
    phrase: 'middle child',
    image: siblings
  }
];



function App() {
  const [typingText, setTypingText] = useState("");
  const cursorRef = useRef(null);
  const [cards, setCards] = useState(phrases);
  const [showAlert, setShowAlert] = useState(false);
  // State to ensure alert is shown only once
  const [alertShownOnce, setAlertShownOnce] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const [springs, api] = useSprings(cards.length, index => ({
    x: -7 * (cards.length - index - 1), // Top card is centered, others are slightly offset
    y: 0,
    scale: index === cards.length - 1 ? 1 : 0.97 ** (cards.length - index - 1), // Top card is full size, others are slightly smaller
    rot: index === cards.length - 1 ? 0 : -4 * (cards.length - index - 1), // Top card has no rotation, others are slightly tilted
    from: { x: 0, rot: 0, scale: 1, y: -100 }
  }));

  const bind = useGesture({
    onDrag: ({ args: [index], down, movement: [mx] }) => {
      api.start(i => {
        const isTouchScreen = window.matchMedia('(hover: none)').matches;

        if (index !== i) {
          if (!isTouchScreen && Math.abs(mx) >= 250) {
            return {
              rot: -4 * (cards.length - i - 2),
              scale: 0.97 ** (cards.length - i - 2),
              x: -7 * (cards.length - i - 2),
            };
          }
          return {
            rot: -4 * (cards.length - i - 1),
            scale: 0.97 ** (cards.length - i - 1),
            x: -7 * (cards.length - i - 1),
          };
        }
        const x = down ? mx : 0;
        const rot = mx / 100 + (down ? mx / 10 : 0);
        const scale = down ? 0.997 ** Math.abs(mx) : 1;
        return { x, rot, scale, immediate: down };
      });
    },
    onDragEnd: ({ args: [index], movement: [mx] }) => {
      const isTouchScreen = window.matchMedia('(hover: none)').matches;

      // Bypass the check if the device is a touchscreen
      if (!isTouchScreen && Math.abs(mx) < 250) {
        if (!alertShownOnce) {
          setAlertShownOnce(true);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
        }
        return;
      }

      setAlertShownOnce(true);

      // Animate the card moving downwards
      api.start(i => {
        if (index !== i) return;
        return { y: 1000, rot: 0, scale: 1 }; // Adjust the y value to move the card downwards
      });

      // Wait for the animation to complete, then rearrange the cards
      setTimeout(() => {
        setCards(prev => {
          let newCards = [...prev];
          const [swipedCard] = newCards.splice(index, 1);
          newCards = [swipedCard, ...newCards];
          return newCards;
        });

        // Reset the position of the swiped card
        api.start(i => {
          if (index === i) {
            return { y: 0, immediate: true }; // Reset the position for the swiped card
          }
          // Reset the position and style of other cards
          return {
            y: 0, rot: -4 * (cards.length - i - 1),
            scale: 0.97 ** (cards.length - i - 1),
            x: -7 * (cards.length - i - 1),

          };
        });
      }, 300); // Timeout duration should match your animation duration
    }
  });



  // const scrollRef = useRef(null);

  // const handleScroll = () => {
  //   const { current } = scrollRef;
  //   if (current) {
  //     current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  useEffect(() => {
    const handleScrollAttempt = () => {
      if (!alertShownOnce) {
        setAlertShownOnce(true);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      }
    };

    window.addEventListener("wheel", handleScrollAttempt);

    return () => {
      window.removeEventListener("wheel", handleScrollAttempt);
    };
  }, [alertShownOnce]);

  useEffect(() => {

    const handleKeyPress = (event) => {
      if (event.keyCode === 39 || event.keyCode === 13 || event.keyCode === 32) { // Right arrow or Enter key or Spacebar
        // animate the card moving downwards
        api.start(i => {
          if (i === cards.length - 1) {
            return { y: 1000, rot: 0, scale: 1 }; // Adjust the y value to move the card downwards
          }
        });

        // Wait for the animation to complete, then rearrange the cards
        setTimeout(() => {
          setCards(prev => {
            let newCards = [...prev];
            const [swipedCard] = newCards.splice(cards.length - 1, 1);
            newCards = [swipedCard, ...newCards];
            return newCards;
          });

          // Reset the position of the swiped card
          api.start(i => {
            if (i === cards.length - 1) {
              return { y: 0, immediate: true }; // Reset the position for the swiped card
            }
            // Reset the position and style of other cards
            return {
              y: 0, rot: -4 * (cards.length - i - 1),
              scale: 0.97 ** (cards.length - i - 1),
              x: -7 * (cards.length - i - 1),

            };
          });
        }, 300); // Timeout duration should match your animation duration
      }
      else {
        if (!alertShownOnce) {
          setAlertShownOnce(true);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
        }
      }

    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [alertShownOnce, api, cards.length]);


  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const cursor = cursorRef.current;
    let direction = 1;
    let phraseIdx = cards.length - 1;
    let sentence = cards[phraseIdx].phrase;
    let cursorPos = 0;
    let blinking = false;
    let blinkIntervals = 0;

    const switchDirection = () => {
      direction *= -1;
      toggleTyping();
    };

    const toggleTyping = () => {
      blinking = !blinking;
      cursor.classList.toggle('blink', blinking);
    };

    const intervalId = setInterval(() => {
      const atStart = cursorPos === 0;

      if ((atStart && direction === -1)) {
        switchDirection();
      }

      if (!blinking) {
        cursorPos += direction;
        setTypingText(sentence.slice(0, cursorPos));
      } else {
        blinkIntervals++;
        if (blinkIntervals >= 6) { // Reduced blinking interval for faster typing
          blinkIntervals = 0;
          toggleTyping();
        }
      }
    }, 60); // Reduced interval time for faster typing

    return () => {
      clearInterval(intervalId);
    };

  }, [cards]); // Add cards as a dependency so it updates with card changes



  return (
    <div className="App">
      <header className="App-header">
        <div style={{ position: 'relative', width: '300px', height: '400px', margin: '0 auto', marginBottom: 30 }}>
          {springs.map(({ x, y, rot, scale }, i) => (
            <animated.div
              key={i}
              style={{
                x,
                y,
                rotateZ: rot,
                scale,
                position: 'absolute',
                width: '100%',
                height: '100%',
                willChange: 'transform'
              }}
              {...bind(i)}
            >
              <animated.div
                style={{ backgroundImage: `url(${cards[i].image})`, height: 400 }}
                className="card"
              />
            </animated.div>
          ))}
        </div>

        <h1>Hello 👋! I'm Yuen Ler.</h1>
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>I am a </span><span style={{ fontSize: 30 }}>{`${typingText}`}</span><span
            ref={cursorRef} className="blink" style={{ fontSize: 30 }}>|</span>
        </div>
        <DistanceCalculator />
        {/* <button onClick={handleScroll} className="hoverButton">
          <p>Learn More</p> <FontAwesomeIcon icon={faChevronDown} />
        </button> */}
        <div style={{
          fontSize: '1rem',
          position: 'absolute',
          bottom: 0,
        }}>
          <Alert
            show={showAlert}
            // onClose={() => setShowAlert(false)}
            // dismissible
            className={showAlert ? 'fadeIn' : 'fadeOut'}

            variant="info"
          >
            Try dragging the cards to see my other pictures!
          </Alert>
        </div>
        <p
          style={{
            fontSize: '0.7rem',
            position: 'absolute',
            bottom: 0,
            textDecorationLine: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => { setShowModal(true); }}
        >why do i have a website?</p>
      </header >
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Why do I have a website?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            I genuinely do not know, but hopefully you found what you were looking for.
            If you want to contact me,
            you can <a href="mailto:yuenlerchow@college.harvard.edu">email me</a> or DM
            me on <a href="https://www.linkedin.com/in/yuenler/"
              target='_blank' rel="noreferrer"
            >Linkedin</a>. Also here's my <a
              href="https://docs.google.com/document/d/e/2PACX-1vROVaHFw7SYKHYthJJXxSv4QumRTgY4nsAb6YGDGmdSqkqvu6c3dkkScQHx1oofALhNBTnON3n_frem/pub"
              target='_blank'
              rel="noreferrer"
            >resume</a> if you wanna stare at it.
          </p>
        </Modal.Body>
      </Modal>
      {/* <div ref={scrollRef}>
        <LearnMore />
      </div> */}

    </div >
  );
}


export default App;
