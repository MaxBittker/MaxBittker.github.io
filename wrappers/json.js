import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'
import { prefixLink } from 'gatsby-helpers'

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },

  getInitialState () {
    return{ count: 0 }
  },

  handlePlusClick () {
    this.setState({ count: this.state.count + 1 })
  },

  handleMinusClick () {
    this.setState({ count: this.state.count - 1 })
  },

  render () {
    const data = this.props.route.page.data
    let scs = data.screenshots.map(({name,loc},i) => {
        return (
          <div key={i}
            style={{height:'80%',
                     width:'80%',
                      margin:'auto'}}>
            {/* <h3> {name}</h3> */}
            <img src={prefixLink('/screenshots/'+loc)}/>
          </div>
        )
    })
    return (
      <div>
        <Helmet
          title={`${config.siteTitle} | ${data.title}`}
        />
        <h1>Generative Artwork</h1>
        <h3>mostly built with clojurescript, reagent, svg, and a pen plotter</h3>
        {/* <button onClick={() => this.handleMinusClick()}>{'<'}</button> */}
        {/* <button onClick={() => this.handlePlusClick()}>{'>'}</button> */}
        <div style={{display:'flex',flexWrap:'wrap'}}>
          {scs}
        </div>
      </div>
    )
  },
})
