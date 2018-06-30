import React from 'react'
import Raven from 'raven-js'
import WebGL from '../components/webgl.js'

import './example.less'

Raven.config('https://00f21757ccfe49a49742d4f9d7f1ab30@sentry.io/1234724', {
  release: '2.0.0',
  enviroment: 'production',
}).install()

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <WebGL />
      </div>
    )
  }
}
