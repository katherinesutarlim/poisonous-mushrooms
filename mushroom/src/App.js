import React, { Component } from 'react';
import './App.css';
import data from './data';

function Card({imageSrc, imageRef, latinName, commonName, clickHandler}) {
  return (
    <div className="photoCard" onClick={clickHandler}>
      <img src={imageSrc} className="photo" alt={commonName}/>
      <a href={imageRef} className="photoRef">Source</a>
      <h4><b>{commonName}</b></h4>
      <h4><i>{latinName}</i></h4>
    </div>
  );
}

function DetailCard({item, closeCard}) {
  return (
    <div className="darken" onClick={closeCard}>
      <div className="detailCard">
        <div className="left">
          <img src={item.imageSrc} className="photo" alt={item.commonName}/>
          <h3>Distribution</h3>
          <ul>
            {item.distribution.map((area) => (<li>{area}</li>))}
          </ul>
        </div>
        <div className="right">
          <h2><b>{item.commonName}</b></h2>
          <button onClick={closeCard}>X</button>
          <h2><i>{item.latinName}</i></h2>
          <h3>Some defining characteristics</h3>
          <ul>
            {item.characteristics.map((characteristic) => (<li>{characteristic}</li>))}
          </ul>
          <h3>Symptoms</h3>
          <ul>
            {item.symptoms.map((symptom) => (<li>{symptom}</li>))}
          </ul>
          <p>All information here is summarised from <a href={item.articleRef}>this page</a></p>
        </div>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      displayDetail: false,
    }
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleCloseCard = this.handleCloseCard.bind(this);
  }

  handleCardClick(item) {
    this.setState({
      selected: item,
      displayDetail: true,
    })
  }

  handleCloseCard() {
    this.setState({
      displayDetail: false,
    })
  }

  render() {
    let detail = null;
    if (this.state.displayDetail) {
      detail = <DetailCard item={this.state.selected} closeCard={this.handleCloseCard}/>
    }
    return (
      <div className="App">
        <h1>Danger Shrooms</h1>
        <p>The edibility of most mushrooms in Australia is pretty much unknown, but here are some that should be avoided (unless you know what you're doing).</p>
        <h2>DO TAKE EVERY INFORMATION HERE WITH A GRAIN OF SALT - THIS IS COMPILED BY AN AMATEUR</h2>
        {detail}
        <div className="cardContainer">
          {data.map((item)=>
            <Card
              imageSrc={item.imageSrc}
              imageRef={item.imageRef}
              latinName={item.latinName}
              commonName={item.commonName}
              clickHandler={() => this.handleCardClick(item)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
