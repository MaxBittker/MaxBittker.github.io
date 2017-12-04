import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import Helmet from "react-helmet"
import { config } from 'config'
import includes from 'lodash/includes'

class BlogIndex extends React.Component {
  render () {
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, 'data.date')
    // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
    let visiblePages = sortedPages.filter(page => (
      get(page, 'file.ext') === 'md' && !includes(page.path, '/404') || get(page, 'data.date')
    ))
    visiblePages.sort((b,a)=> new Date(a.data.date).getTime() - new Date(b.data.date).getTime())

    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
          ]}
        />
        <ul>
          {visiblePages.map((page) => (
              <li
                key={page.path}
                style={{
                    marginBottom: rhythm(1/4),
                }}
              >
                <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>
                    {get(page, 'data.title', page.path)}
                </Link>
              </li>
          ))}
        </ul>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
