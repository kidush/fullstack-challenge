import React from 'react';
import 'light-modal';
import './CoverOverlay.css';

const overlay = (props) => {
  return (
    <div id="overlay" className="cover-overlay">
      <div className="overlay-content">
        <div className="light-modal-header">
          <h3 className="light-modal-heading">{ props.comic.title }</h3>
          <a onClick={ props.click } href="#" className="light-modal-close-icon" aria-label="close">&times;</a>
        </div>

        <div className="overlay-body">
          <img src={ props.cover } />
          <p>Issue Number: {props.comic.issueNumber}</p>
          <p>ISBN: {props.comic.isbn}</p>
          <p>Varian Description: {props.comic.variantDescription}</p>
        </div> 
      </div>
    </div>
  );
};

export default overlay;