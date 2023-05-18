import React, { useEffect, useRef } from 'react';

import './Card.css'

function Card({
  title,
  description,
  longDescription,
  image,
  color
}) {

  const modalRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const pageTop = window.pageYOffset;
      const pageBottom = pageTop + window.innerHeight;
      const tags = document.getElementsByClassName('tag');

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        if (tag.getBoundingClientRect().top < pageBottom) {
          tag.classList.add('visible');
        } else {
          tag.classList.remove('visible');
        }
      }
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function openModal(index) {
    const modal = modalRef.current;
    modal.style.display = 'block';
  }

  function closeModal(index) {
    const modal = modalRef.current;
    modal.style.display = 'none';
  }
  return (
    <div className="m-3">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={image} style={{ width: 300, backgroundColor: color }} alt="cardImage" />
          </div>
          <div className="flip-card-back">
            <h2>{title}</h2>
            <p style={{ fontSize: 20 }}>{description}</p>
            <button type="button" className="btn btn-secondary" onClick={() => openModal()}>More info</button>
          </div>
        </div>
      </div>
      <div ref={modalRef} className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal()}>&times;</span>
          <p style={{ color: 'black' }}>{longDescription}</p>
        </div>
      </div>
    </div>

  );

}

export default Card;