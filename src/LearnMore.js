import React, { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Work from "./Work";
import Life from "./Life";
import Sleep from "./Sleep";


function LearnMore() {

  const [selected, setSelected] = useState(0);

  const scrollRef = useRef(null);

  const handleScroll = () => {
    const { current } = scrollRef;
    if (current) {
      current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (

    <div>
      <div className="App-header">
        <div style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '5%' }}>
          <p>  Last Tuesday, I told myself that I would become a strong proponent of work-life-sleep balance.
            Click on the buttons below to learn more about each of these 3 crucial aspects of my life.</p>
        </div>
        <Row>
          <Col xs={4}>
            <Button className="btn btn-outline-light btn-lg btn-block"
              onClick={() => { setSelected(1); handleScroll(); }}
            >Work</Button>
          </Col>
          <Col xs={4}>
            <Button className="btn btn-outline-light btn-lg btn-block"
              onClick={() => { setSelected(2); handleScroll(); }}
            >Life</Button>
          </Col>
          <Col xs={4}>
            <Button className="btn btn-outline-light btn-lg btn-block"
              onClick={() => { setSelected(3); handleScroll(); }}
            >Sleep</Button>
          </Col>
        </Row>
      </div >

      <div ref={scrollRef} className="App-header" >
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

