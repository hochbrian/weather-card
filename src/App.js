import React from 'react'
import io from 'socket.io-client'
import { Card, CardTitle, CardSubtitle, CardText, CardImg, CardImgOverlay, CardFooter, Badge } from 'reactstrap'
import Skycon from './skycon'
import Moon from './lunar'
import AirBadge from './air'


export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      connections: '',
      report: {
        currently: {
          summary: 'loading...',
          temperature: '',
          windSpeed: 0,
          windBearing: 0
        },
        minutely: {
          summary: ''
        },
        hourly: {
          summary: ''
        },
        daily: {
          data: [
            {
              moonPhase: 0
            }
          ]
        }
      },
      img: '/img/snow.jpg',
      fontColor: '',
      air: {
        data: {
          current: {
            pollution: {
              aqius: 0
            }
          }
        }
      }
    }

    this.setImg = this.setImg.bind(this)
  }

  componentWillMount() {
      this.socket = io('http://localhost:3000');
      this.socket.on('connect', () => { this.setState({ status: 'connected' }) })
      this.socket.on('disconnect', () => { this.setState({ status: 'disconnected' }) })
      this.socket.on('weather-report', (payload) => {
        console.log('Weather Update Recieved')
        //console.log(JSON.stringify(payload,true,3))
        this.setState({ report: payload })
        this.setImg(payload.currently.icon)
      })
      this.socket.on('air-report', (payload) => {
        console.log('Air Update Recieved')
        //console.log(JSON.stringify(payload,true,3))
        this.setState({ air: payload })
      })
      this.socket.on('joined', connections => {
        this.setState({ connections: connections.connections })
        this.socket.emit('data-request', {})
      })
      this.socket.on('clientDisconnect', connections => { this.setState({ connections: connections.connections }) })
  }

  setImg(icon) {
    switch (icon) {
      case 'rain':
        this.setState({img: '/img/rain.jpg'})
        break
      case 'partly-cloudy-day':
        if (this.state.report.currently.summary === 'Mostly Cloudy') {
          this.setState({img: '/img/cloud.jpg', fontColor: 'text-muted'})
        } else {
          this.setState({img: '/img/partly-cloudy-day.jpg'})
        }
        break
      case 'partly-cloudy-night':
        if (this.state.report.currently.summary === 'Mostly Cloudy') {
          this.setState({img: '/img/mostly-cloudy-night.jpg'})
        } else {
          this.setState({img: '/img/partly-cloudy-night.jpg'})
        }
        break
      case 'cloudy':
        this.setState({img: '/img/overcast.jpg'})
        break
      case 'sleet':
        this.setState({img: 'img/sleet.jpg', fontColor: 'text-muted'})
      case 'snow':
        this.setState({img: '/img/snow.jpg'})
        break
      case 'fog':
        this.setState({img: '/img/fog.jpg', fontColor: 'text-muted'})
        break
      case 'wind':
        this.setState({img: '/img/windy.jpg'})
        break
      case 'clear-day':
        this.setState({img: '/img/clear.jpg'})
        break
      case 'clear-night':
        this.setState({img: '/img/clear-night.jpg'})
        break
      default:
        this.setState({img: '/img/clear.jpg'})
        console.log('leave as default img')
    }
  }

  render() {
    return (
      <div>
        <div className="col-md-12 col-lg-9 mt-3 mx-auto">
          <Card inverse>
            <CardImg width="100%" src={this.state.img}/>
            <CardImgOverlay>
              <CardTitle className={'display-4 ' + this.state.fontColor + 'd-flex justify-content-between'}>
                  <span><Skycon icon={this.state.report.currently.icon}/> {this.state.report.currently.summary}</span>
                  <span><Moon phase={this.state.report.daily.data[0].moonPhase}/></span>
              </CardTitle>
              <span className="d-flex justify-content-between">
                <span>
                  <CardSubtitle className={this.state.fontColor}>{(typeof this.state.report.minutely != 'undefined') ? this.state.report.minutely.summary : ''}</CardSubtitle>
                  <CardText className={this.state.fontColor}>
                    {this.state.report.hourly.summary}
                  </CardText>
                </span>
                <AirBadge aqi={this.state.air.data.current.pollution.aqius} />
              </span>
              <div style={{position: 'absolute', bottom: '12.5%', right: '1%', width: '100%'}}>
                <span className="d-flex justify-content-between">
                  <span className="d-flex align-items-end xs-mb-2 ml-3">
                    <h5>{Math.round(this.state.report.currently.windSpeed)}mph <i className="fa fa-long-arrow-up fa-lg mb-1 ml-2" style={{ transform: 'rotate(' + (this.state.report.currently.windBearing -180) + 'deg)'}}></i></h5>
                  </span>
                  <span className="display-2">
                    {Math.round(this.state.report.currently.temperature)}˚
                  </span>
                </span>
              </div>
            </CardImgOverlay>
            <CardFooter className="text-muted"><p className="d-flex justify-content-between mx-2"><span><a href="https://darksky.net/poweredby/">Powered By Dark Sky</a></span></p></CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

//<code>
//  <pre>{JSON.stringify(this.state.report, true, 3)}</pre>
//</code>
