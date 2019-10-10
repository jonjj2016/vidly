import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
    box: {},
    route: 'signOut',
    isSigned: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      lastName: '',
      joined: ''
    }
  };

  onInputChancge = e => {
    console.log(e.target.value);
    this.setState({
      input: e.target.value
    });
  };
  calculateFaceLocation = data => {
    const clearifyFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      leftCol: clearifyFace.left_col * width,
      topRow: clearifyFace.top_row * height,
      rightCol: width - clearifyFace.right_col * width,
      bottomRow: height - clearifyFace.bottom_row * height
    };
  };
  displayFaceBox = box => {
    this.setState({
      box
    });
  };
  onloadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: 0,
        lastName: data.lastName,
        joined: data.joined
      }
    });
  };
  onSetinputs = data => {
    this.setState({
      user: {
        name: data.name,
        id: data.id,
        entries: data.entries
      }
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      imageURL: this.state.input
    });

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,

        this.state.input
      )
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              console.log(count);
              this.setState({ user: { entries: count } });
            })
            .catch(err => console.log('error here', err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };
  onRoutChange = route => {
    if (route === 'signOut') {
      this.setState({
        isSigned: false
      });
    } else if (route === 'home') {
      this.setState({
        isSigned: true
      });
    }
    this.setState({
      route: route
    });
  };

  render() {
    const { imageURL, box, route, isSigned } = this.state;
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
        <Navigation signedIn={isSigned} onRoutChange={this.onRoutChange} />{' '}
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} rank={this.state.user.entries} />
            <ImageLinkForm
              onInputChancge={this.onInputChancge}
              onSubmit={this.onSubmit}
            />{' '}
            <FaceRecognition box={box} imageURL={imageURL} />{' '}
          </div>
        ) : route === 'signOut' ? (
          <Signin
            setinputs={this.onSetinputs}
            onRoutChange={this.onRoutChange}
          />
        ) : (
          <Register
            loadUser={this.onloadUser}
            onRoutChange={this.onRoutChange}
          />
        )}{' '}
      </div>
    );
  }
}

export default App;
//
