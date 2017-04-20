import React from 'react'
import io from 'socket.io-client'
import { Card, CardTitle, CardSubtitle, CardText, CardImg, CardImgOverlay, CardFooter } from 'reactstrap'
import Skycon from './skycon'


export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      connections: '',
      report: {
        currently: {
          summary: 'loading...',
          temperature: ''
        },
        minutely: {
          summary: ''
        },
        hourly: {
          summary: ''
        }
      },
      img: '/img/snow.jpg',
      skycon: 'tmp'
    }

    this.setImg = this.setImg.bind(this)
  }

  componentWillMount() {
      this.socket = io('http://localhost:3000');
      this.socket.on('connect', () => { this.setState({ status: 'connected' }) })
      this.socket.on('disconnect', () => { this.setState({ status: 'disconnected' }) })
      this.socket.on('weather-report', (payload) => {
        this.setState({ report: payload })
        this.setImg(payload.currently.summary)
        //console.log(JSON.stringify(payload,true,3))
        console.log('Update Recieved')
      })
      this.socket.on('joined', connections => {
        this.setState({ connections: connections.connections })
        this.socket.emit('weather-request', {})
      })
      this.socket.on('clientDisconnect', connections => { this.setState({ connections: connections.connections }) })
  }

  setImg(current) {
    switch (current) {
      case 'Light Rain':
        this.setState({img: '/img/rain.jpg', skycon: 'rain'})
        break
      case 'Rain':
        this.setState({img: '/img/heavy-rain.jpg', skycon: 'rain'})
        break
      case 'Partly Cloudy':
        this.setState({img: '/img/cloud.jpg', skycon: 'partly-cloudy-day'})
        break
      case 'Mostly Cloudy':
      case 'Overcast':
        this.setState({img: '/img/overcast.jpg', skycon: 'cloudy'})
        break
      case 'Snow':
        this.setState({img: '/img/snow.jpg', skycon: 'snow'})
        break
      case 'Fog':
        this.setState({img: '/img/fog.jpg', skycon: 'fog'})
        break
      case 'Windy':
        this.setState({img: '/img/windy.jpg', skycon: 'wind'})
        break
      case 'Sunny':
        this.setState({img: '/img/clear.jpg', skycon: 'clear-day'})
        break
      default:
        this.setState({img: '/img/snow.jpg'})
        console.log('leave as default img')
    }
  }

  render() {
    var d = new Date()
    return (
      <div>
        <div className="col-md-12 col-lg-9 mt-3 mx-auto">
          <Card inverse>
            <CardImg width="100%" src={this.state.img}/>
            <CardImgOverlay>
              <CardTitle className="display-4">
                  <Skycon icon={this.state.skycon}/> {this.state.report.currently.summary}
              </CardTitle>
              <CardSubtitle>{this.state.report.minutely.summary}</CardSubtitle>
              <CardText>
                {this.state.report.hourly.summary}
              </CardText>
              <div style={{position: 'absolute', bottom: '12.5%', right: '1%', width: '100%'}}>
                <span className="display-2 d-flex justify-content-end">{Math.round(this.state.report.currently.temperature)}˚</span>
              </div>
            </CardImgOverlay>
            <CardFooter className="text-muted"><p className="d-flex justify-content-between mx-2"><span><a href="https://darksky.net/poweredby/">Powered By Dark Sky</a></span><span>&copy; {d.getFullYear()} - Brian E Hoch</span></p></CardFooter>
          </Card>
        </div>

      </div>
    );
  }
}


//<code>
//  <pre>{JSON.stringify(this.state.report, true, 3)}</pre>
//</code>
