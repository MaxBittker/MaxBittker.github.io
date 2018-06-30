import Link from 'gatsby-link'

import React from 'react'
import { Container } from 'react-responsive-grid'
import Headroom from 'react-headroom'
import Favicon from '../components/favicon.js'

module.exports = React.createClass({
  propTypes() {
    return {
      children: React.PropTypes.any,
      siteTitle: React.PropTypes.string,
    }
  },

  render() {
    let headerStyle = {
      transition: 'background-color 0.3s ease',
    }
    Favicon()
    if (typeof window != 'undefined') {
      if (window.location.pathname !== '/') {
        headerStyle = {
          transition: 'background-color 0.3s ease',
          background: `hsl(${Math.random() * 255},45%,80%)`,
        }
      }
    }
    return (
      <div>
        <Headroom
          wrapperStyle={{
            marginBottom: '15px',
          }}
          style={headerStyle}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingTop: 0,
              padding: '1.65rem 1.2376rem',
            }}
          >
            <Link
              to={'/'}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              max bittker ∙&nbsp;
            </Link>
            <Link
              to={'/about/'}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              about ∙&nbsp;
            </Link>

            <Link
              to={'/games/'}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              games ∙&nbsp;
            </Link>
            <Link
              to={'/art/'}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              art ∙&nbsp;
            </Link>
            <Link
              to={'/blog/'}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              blog
            </Link>
          </Container>
        </Headroom>
      </div>
    )
  },
})
