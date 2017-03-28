import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Raven from 'raven-js'
import WebGL from '../components/webgl.js'
import './example.less'

Raven.config('https://5fdcb3aeb7f446a1aaac367d932a48bd@sentry.io/100653',{
  release: 'FFF',
}).install();


export default class Index extends React.Component {

  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
        />
        <WebGL/>
      </div>
    )
  }
}
