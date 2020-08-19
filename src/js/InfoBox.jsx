import React from 'react';
import '../css/InfoBox.css'






export class InfoBox extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      isToggleON: true,
      fullDescription: null,
      currentItem: 0

    }

    this.Toggle = this.Toggle.bind(this);
    this.slideNext = this.slideNext.bind(this);
    this.slidePrev = this.slidePrev.bind(this);
    this.slideFirst = this.slideFirst.bind(this);
    this.slideLast = this.slideLast.bind(this);
  }
  componentDidMount() {
    fetch('https://my-json-server.typicode.com/IlyaLytvynov/ads-box-server/ads')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          })
        }
      )
  }
  Toggle() {
    this.setState(state => ({
      isToggleON: !state.isToggleON
    }))
  }
  slideNext() {
    if (this.state.currentItem < this.state.items.length - 1) {
      this.setState(state => ({
        currentItem: state.currentItem + 1,
        isToggleON: true,

      }))


    }
  }
  slidePrev() {
    if (this.state.currentItem > 0) {
      this.setState(state => ({
        currentItem: state.currentItem - 1,
        isToggleON: true
      }))
    }
  }
  slideFirst() {
    if (this.state.currentItem > 0) {
      this.setState(state => ({
        currentItem: 0,
        isToggleON: true
      }))
    }
  }
  slideLast() {
    if (this.state.currentItem < this.state.items.length - 1) {
      this.setState(state => ({
        currentItem: this.state.items.length - 1,
        isToggleON: true
      }))
    }
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <p>Loading...</p>
      )
    }
    else {
      return (
        <div className="main">
          <div className="infobox">
            <div className="infobox-block">
              <div className="infobox-information">
                <div className="img-block">
                  <img alt={this.state.items[this.state.currentItem].title} src={this.state.items[this.state.currentItem].img} />
                </div>
                <div className={this.state.isToggleON ? 'description-block' : 'description-block toggle'}>
                  <div className="title-block">
                    <a target="blank" href={this.state.items[this.state.currentItem].productUrl}><span>{this.state.items[this.state.currentItem].title}</span></a>
                  </div>
                  <div className="text">
                    <p>{this.state.isToggleON ? this.state.items[this.state.currentItem].description.slice(0, 50) + "..." : this.state.items[this.state.currentItem].description.slice(0, 50)}
                      <span className={this.state.isToggleON ? 'hidden-element' : 'hidden-element toggle'}>{this.state.items[this.state.currentItem].description.slice(50)}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="toogle">
              <button onClick={this.Toggle}>
                {this.state.isToggleON ? 'More information' : 'Hide'}
              </button></div>
            <div className="controlButtons">
              <button onClick={this.slideFirst} className={this.state.currentItem > 0 ? '' : 'non-active'} >{'<<<'}</button>
              <button onClick={this.slidePrev} className={this.state.currentItem > 0 ? '' : 'non-active'} >{'<'}</button>
              <button onClick={this.slideNext} className={this.state.currentItem < this.state.items.length - 1 ? '' : 'non-active'}>{'>'}</button>
              <button onClick={this.slideLast} className={this.state.currentItem < this.state.items.length - 1 ? '' : 'non-active'} >{'>>>'}</button>
            </div>
          </div>
        </div >
      )
    }
  }
}
