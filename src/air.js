import React from 'react'
import { Badge } from 'reactstrap'

export default class AirBadge extends React.Component {

  constructor() {
    super()

    this.state = {
      aqi: 0,
      alert: 'default'
    }
  }

  componentWillReceiveProps(newProps) {
    var alert = ''
    if (newProps.aqi < 50) {
      alert = 'success'
    } else if (newProps.aqi < 150) {
      alert = 'warning'
    } else {
      alert = 'danger'
    }

    this.setState({ alert: alert, aqi: newProps.aqi })

  }

  render(){
    return(
      <Badge color={this.state.alert}>
        <h4>{this.state.aqi}</h4>Air Quality Index
      </Badge>
    )
  }
}
