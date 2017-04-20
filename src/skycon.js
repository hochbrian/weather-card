import React from 'react'

export default class Skycon extends React.Component {

  constructor() {
    super()

    this.state = {
      cday: 'hidden-xs-up',
      cnight: 'hidden-xs-up',
      pcday: 'hidden-xs-up',
      pcnight: 'hidden-xs-up',
      cloud: 'hidden-xs-up',
      sleet: 'hidden-xs-up',
      snow: 'hidden-xs-up',
      wind: 'hidden-xs-up',
      fog: 'hidden-xs-up',
      rain: 'hidden-xs-up'
    }
  }

  componentWillReceiveProps(newProps) {
    switch (newProps.icon) {
      case 'clear-day':
        this.setState({ cday: 'd-inline'})
        break
      case 'clear-night':
        this.setState({ cnight: 'd-inline'})
        break
      case 'partly-cloudy-day':
        this.setState({ pcday: 'd-inline'})
        break
      case 'partly-cloudy-night':
        this.setState({ pcnight: 'd-inline'})
        break
      case 'cloudy':
        this.setState({ cloud: 'd-inline'})
        break
      case 'sleet':
        this.setState({ sleet: 'd-inline'})
        break
      case 'snow':
        this.setState({ snow: 'd-inline'})
        break
      case 'wind':
        this.setState({ wind: 'd-inline'})
        break
      case 'fog':
        this.setState({ fog: 'd-inline'})
        break
      case 'rain':
        this.setState({ rain: 'd-inline'})
        break
    }
  }

  render() {
    return (
      <span>
        <canvas className={this.state.cday} id="clear-day" width="45" height="45"></canvas>
        <canvas className={this.state.cnight} id="clear-night" width="45" height="45"></canvas>
        <canvas className={this.state.pcday} id="partly-cloudy-day" width="45" height="45"></canvas>
        <canvas className={this.state.pcnight} id="partly-cloudy-night" width="45" height="45"></canvas>
        <canvas className={this.state.cloud} id="cloudy" width="45" height="45"></canvas>
        <canvas className={this.state.sleet} id="sleet" width="45" height="45"></canvas>
        <canvas className={this.state.snow} id="snow" width="45" height="45"></canvas>
        <canvas className={this.state.wind} id="wind" width="45" height="45"></canvas>
        <canvas className={this.state.fog} id="fog" width="45" height="45"></canvas>
        <canvas className={this.state.rain} id="rain" width="45" height="45"></canvas>
      </span>
    );
  }
}
