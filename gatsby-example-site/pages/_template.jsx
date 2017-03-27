import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'
import '../css/markdown-styles'

import { rhythm } from '../utils/typography'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    let headerStyle = {
      transition: 'background-color 0.3s ease'
    }

    if(this.props.location.pathname !== '/'){
        headerStyle = {
          transition: 'background-color 0.3s ease',
          background: '#badbae',
        }
    }
    return (
      <div>
        <Headroom
          wrapperStyle={{
            marginBottom: rhythm(0.5),
          }}
          style={headerStyle}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingTop: 0,
              padding: `${rhythm(1)} ${rhythm(3/4)}`,
            }}
          >
            <Link
              to={prefixLink('/')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
             max bittker ∙
            </Link>
            <Link
              to={prefixLink('/about/')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
             about ∙
            </Link>
            <Link
              to={prefixLink('/art/')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
             art ∙
            </Link>
            <Link
              to={prefixLink('/blog/')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              blog ∙
            </Link>
            <a
              href='https://twitter.com/MaxBittker'
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              twitter ∙
            </a>
            <a
              href='https://github.com/MaxBittker'
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              github
            </a>

          </Container>
        </Headroom>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </Container>
        <script src="https://www.recurse-scout.com/loader.js?t=3a128824cb3dacb3e5bf25cec6f3b40e"/>
      </div>
    )
  },
})
