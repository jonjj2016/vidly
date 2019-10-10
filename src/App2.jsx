import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition2 from './components/FaceRecognition/FaceRecognition2';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '5693b10f40b74beab40bf38466ea40bb '
});
class App extends Component {
  state = {
    input: '',
    imageURL: '',
    box: []
  };
  data = '';
  onInputChancge = e => {
    console.log(e.target.value);
    this.setState({ input: e.target.value });
  };
  calculateFaceLocation = data => {
    console.log(data);
    const clearifyFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
    const clearifyFacesArr = clearifyFaces.map(item => {
      // console.log(height, width);
      return {
        leftCol: item.region_info.bounding_box.left_col * width,
        topRow: item.region_info.bounding_box.top_row * height,
        rightCol: width - item.region_info.bounding_box.right_col * width,
        bottomRow: height - item.region_info.bounding_box.bottom_row * height
      };
    });
    console.log(clearifyFacesArr);
    return clearifyFacesArr;
    // const image = document.getElementById('inputImage');
    // const height = Number(image.height);
    // const width = Number(image.width);
    // console.log(height, width);
    // return {
    //   leftCol: clearifyFace.left_col * width,
    //   topRow: clearifyFace.top_row * height,
    //   rightCol: width - clearifyFace.right_col * width,
    //   bottomRow: height - clearifyFace.bottom_row * height
    // };
  };
  displayFaceBox = box => {
    console.log(box);
    this.setState({ box });
  };
  onSubmit = () => {
    this.setState({ imageURL: this.state.input });

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,

        this.state.input
      )
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={{
            particles: {
              number: {
                value: 85,
                density: {
                  enable: true,
                  value_area: 1000
                }
              },

              line_linked: {
                shadow: {
                  enable: true,
                  color: '#3CA9D1',
                  blur: 5
                }
              }
            }
          }}
          style={{
            width: '100%'
            // backgroundImage: `url(${logo})`
          }}
        />{' '}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChancge={this.onInputChancge}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition2 box={this.state.box} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
