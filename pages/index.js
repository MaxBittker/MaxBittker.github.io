import React from 'react';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';
import Helmet from 'react-helmet';
import {config} from 'config';
import Raven from 'raven-js';
import WebGL from '../components/webgl.js';
import './example.less';

Raven.config('https://5e62397e864445799609ae7109b0c2b5@sentry.io/169778', {
  release: '1.3.0',
  enviroment: 'production'
}).install();

Raven.setUserContext({
  foo: 'bar',
  email: 'max@sentry.io',
  id: 123
});

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={config.siteTitle} />
        <WebGL />
      </div>
    );
  }
}
