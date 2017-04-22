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
        this.setState({
          cday: 'd-inline',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'clear-night':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'd-inline',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'partly-cloudy-day':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'd-inline',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'partly-cloudy-night':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'd-inline',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'cloudy':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'd-inline',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'sleet':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'd-inline',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'snow':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'd-inline',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'wind':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'd-inline',
          fog: 'hidden-xs-up',
          rain: 'hidden-xs-up'
        })
        break
      case 'fog':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'd-inline',
          rain: 'hidden-xs-up'
        })
        break
      case 'rain':
        this.setState({
          cday: 'hidden-xs-up',
          cnight: 'hidden-xs-up',
          pcday: 'hidden-xs-up',
          pcnight: 'hidden-xs-up',
          cloud: 'hidden-xs-up',
          sleet: 'hidden-xs-up',
          snow: 'hidden-xs-up',
          wind: 'hidden-xs-up',
          fog: 'hidden-xs-up',
          rain: 'd-inline'
        })
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
