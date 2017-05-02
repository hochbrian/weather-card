import React from 'react'

export default class Moon extends React.Component {

  constructor() {
    super()

    this.state = {
      moon: 'rgba(255, 255, 255, .85)',
      umbra: 'rgba(0, 0, 0, .7)',
      phase: 0,
      offsetRt: 0,
      offsetLt: 0
    }
  }

  calculatePhase(phase) {

    var offsetRt = null, offsetLt = null, offset = 30

    // Generate percentage
    if (phase > 0.5) {
      phase = 1 - ((phase - 0.5) * 2)
      offsetLt = (phase * offset) - 1
    } else {
      phase = (phase * 2)
      offsetRt = (phase * offset) - 1
    }

    var offset = phase * offset
    this.setState({ phase: phase, offsetRt: offsetRt, offsetLt: offsetLt })

  }

  componentWillReceiveProps(newProps) {

    this.calculatePhase(newProps.phase)

  }

  checkPhaseConversion(){
    console.log('Check phase conversion')
    var origPhase = 0
    var newPhase = 0
    var waxing = false
    while (origPhase < 1) {
      // Generate percentage
      if (origPhase > 0.5) {
        newPhase = Math.abs(origPhase - 1.5)
        waxing = true
      } else {
        newPhase = -1 * (origPhase * 2)
        waxing = false
      }

      console.log('Original Phase:', origPhase)
      console.log('Converted Phase:', newPhase)
      if (waxing)  { console.log('Waxing') }

      origPhase = +((origPhase + 0.01).toFixed(2))
    }
  }

  render() {
    return(
      <div>
        <div style={{
              position: 'absolute',
              right: '3%',
              backgroundColor: this.state.moon,
              width: '30px',
              height: '30px',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img src="img/moon.png" alt="moon" width="30px" height="30px" style={{ position: 'absolute'}}/>
              <div style={{
                    position: 'absolute',
                    backgroundColor: this.state.umbra,
                    borderRadius: '30px',
                    width: '60px',
                    height: '60px',
                    left: this.state.offsetLt,
                    right: this.state.offsetRt,
                    top: '-15px',
                    opacity: '0.9'
                }}>
              </div>
        </div>
      </div>
    )
  }
}
