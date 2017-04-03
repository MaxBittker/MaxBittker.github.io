import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Raven from 'raven-js'
import WebGL from '../components/webgl.js'
import exposedNullCheck from 'raven-js-exposed-null';
import './example.less'

Raven.config('https://2040043382ae40bab0c89cad3204fab4@sentry.io/153842').install()
try{
  exposedNullCheck(Raven);
}catch(e){
  
}

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
