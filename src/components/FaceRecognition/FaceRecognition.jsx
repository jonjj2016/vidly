import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({ imageURL, box }) => {
  //let key=5693b10f40b74beab40bf38466ea40bb

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageURL}
          width="500px"
          height="auto"
          alt=""
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        ></div>
      </div>
    </div>
  );
};
export default FaceRecognition;
