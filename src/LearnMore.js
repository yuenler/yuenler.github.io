import React, { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Work from "./Work";
import Life from "./Life";
import Sleep from "./Sleep";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function LearnMore() {

  const [selected, setSelected] = useState(0);

  const scrollRef = useRef(null);
  const startRef = useRef(null);

  const handleScroll = (num) => {
    if (num === 1) {
      const { current } = scrollRef;
      if (current) {
        current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    else {
      const { current } = startRef;
      if (current) {
        current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

  };


  return (

    <div>
      <div className="App-header" ref={startRef}>
        <div style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '5%' }}>
          <p>  Last Tuesday, I told myself that I would become a strong proponent of work-life-sleep balance.
            Click on the buttons below to learn more about each of these 3 crucial aspects of my life.</p>
        </div>
        <Row>
          <Col xs={4}>
            <Button className="btn btn-outline-light btn-lg btn-block"
              onClick={() => { setSelected(1); handleScroll(1); }}
            >Work</Button>
          </Col>
          <Col xs={4}>
            <Button className="btn btn-outline-light btn-lg btn-block"
              onClick={() => { setSelected(2); handleScroll(1); }}
            >Life</Button>
          </Col>
          <Col xs={4}>
            <Button className="btn btn-outline-light btn-lg btn-block"
              onClick={() => { setSelected(3); handleScroll(1); }}
            >Sleep</Button>
          </Col>
        </Row>
      </div >

      <div ref={scrollRef} className="App-header" >
        <button onClick={() => { handleScroll(0) }} className="hoverButton mb-5">
          <FontAwesomeIcon icon={faChevronUp} />
          <p>Explore a different facet of Yuen Ler </p>
        </button>
        {selected === 1 && (
          <Work />
        )}
        {selected === 2 && (
          <Life />
        )}
        {selected === 3 && (
          <Sleep />
        )}
      </div>
    </div>
  );
}

export default LearnMore;

