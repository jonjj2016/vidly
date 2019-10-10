import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({ onInputChancge, onSubmit }) => {
  return (
    <div>
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures.Giv it a try.'}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 form">
          <input
            onChange={onInputChancge}
            className="f4 pa2 w-70 center"
            type="text"
          />
          <button
            onClick={onSubmit}
            className="w-30 link grow f4 ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
