import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'

export default class ReactComponent extends React.Component {
  constructor () {
    super()
    this.state = { count: 50 }
  }

  handlePlusClick () {
    this.setState({ count: this.state.count + 1 })
  }

  handleMinusClick () {
    this.setState({ count: this.state.count - 1 })
  }

  renderTile(){
    let hue = Math.random()*360;
    return (<div style={{height:'100px',
                           width:'100px',
                           backgroundColor:`hsl(${hue}, 50%, 50%)`}}>
              </div>)
  }

  render () {
    let tiles = (new Array(this.state.count)).fill().map(this.renderTile);
    return (
      <div>
        <Helmet
          title={`${config.siteTitle} | React.js components`}
        />
        <h1>Generative Artwork</h1>
        <h3>mostly built with clojurescript, reagent, svg, and a pen plotter</h3>
        <button onClick={() => this.handleMinusClick()}>{'<'}</button>
        <button onClick={() => this.handlePlusClick()}>{'>'}</button>
        <div style={{display:'flex',flexWrap:'wrap'}}>
          {tiles}
        </div>
      </div>
    )
  }
}
