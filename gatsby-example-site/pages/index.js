import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Raven from 'raven-js'
import WebGL from '../components/webgl.js'
import './example.less'

// Raven.config('https://5fdcb3aeb7f446a1aaac367d932a48bd@sentry.io/100653',{
Raven.config('http://9e0af114063b4c14b4e862f099716526@localhost:8000/1',{
  release: 'FFF',
}).install();


export default class Index extends React.Component {

  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Sample"},
            {"name": "keywords", "content": "sample, something"},
          ]}
        />
    
        <WebGL/>
        <div className='rc-scout'/>
        <script async defer src="https://www.recurse-scout.com/loader.js?t=3a128824cb3dacb3e5bf25cec6f3b40e"></script>
      </div>
    )
  }
}
