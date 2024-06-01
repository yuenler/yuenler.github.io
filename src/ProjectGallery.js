import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './ProjectGallery.css';
import clinicall from './images/clinicall.jpeg';
import voba from './images/voba.png';
import lettuce from './images/lettuce.png';
import stop from './images/stop.png';
import wado from './images/wado.png';
import trader from './images/trader.png';
import evaluai from './images/evaluai.png';
import syndeo from './images/syndeo.jpg';

const projects = [
  {
    id: 1,
    title: "$yndeo",
    description: "$yndeo is a social network platform that enhances user acquisition for organizations through incentivized cryptocurrency-based referrals, providing instant payments via the Sui Wallet.",
    icon: syndeo,
    githubLink: "https://github.com/gardenialiu2/syndeo"
  },
  {
    id: 2,
    title: "Clinicall",
    description: "Find a doctor and book an appointment automatically with AI.",
    icon: clinicall,
    githubLink: "https://github.com/yuenler/clinicall"
  },
  {
    id: 3,
    title: "EvaluAI",
    description: "AI Test Grader: Instant and unbiased test grading for teachers, saving time and providing fair, insightful feedback to students.",
    icon: evaluai,
    githubLink: "https://github.com/yuenler/evaluai"
  },
  {
    id: 4,
    title: "Voba",
    description: "Helping elementary school students learn vocabulary through LLM-generated create-your-own-adventure stories.",
    icon: voba,
    githubLink: "https://github.com/yuenler/voba"
  },
  {
    id: 5,
    title: "Lettuce",
    description: "Lettuce is an app that helps reduces food waste by allowing you to scan grocery receipts, track expiration dates, and build a sustainable community by offering surplus food to friends and neighbors.",
    icon: lettuce,
    githubLink: "https://github.com/yuenler/lettuce"
  },
  {
    id: 6,
    title: "Doze Alert",
    description: "Stay awake at the wheel and avoid dangerous drivers nearby! With ML, Doze Alert detects your sleepiness and warns you of nearby drivers with Doze Alert who are sleepy.",
    icon: stop,
    githubLink: "https://github.com/yuenler/doze-alert"
  },
  {
    id: 7,
    title: "Wado",
    description: "App to help college students find and share events happening on campus.",
    icon: wado,
    githubLink: "https://github.com/yuenler/wado"
  },
  {
    id: 8,
    title: "LLM-powered stock trader",
    description: "This AI-powered stock trading program automates the process of trading stocks by leveraging the capabilities of OpenAI's GPT-4 model.",
    icon: trader,
    githubLink: "https://github.com/yuenler/trader"
  },
];


function ProjectGallery() {
  return (
      <div className="card-container">
        {projects.map((project) => (
         
          <Card key={project.id} className="project-card">
            <a href={project.githubLink} target="_blank" rel="noreferrer"
            style={{textDecoration: 'none', color: 'white'}}
            >
            <Card.Body>
              <Row>
                <Col xs={4} md={3} className="d-flex align-items-center justify-content-center">
                  <img src={project.icon} alt={project.title} className="project-icon" />
                </Col>
                <Col xs={8} md={9}>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
            </a>
          </Card>
        ))}
      </div>
  );
}

export default ProjectGallery;
