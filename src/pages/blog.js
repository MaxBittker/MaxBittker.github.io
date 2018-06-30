import React from 'react'
import PostLink from '../components/post-link'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <div>{Posts}</div>
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`

// import React from 'react'
// import Link from 'gatsby-link'

// import sortBy from 'lodash/sortBy'
// import get from 'lodash/get'
// import includes from 'lodash/includes'

// class BlogIndex extends React.Component {
//   render() {
//     // Sort pages.
//     const sortedPages = sortBy(this.props.route.pages, 'data.date')
//     // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
//     let visiblePages = sortedPages.filter(
//       page =>
//         (get(page, 'file.ext') === 'md' && !includes(page.path, '/404')) ||
//         get(page, 'data.date')
//     )
//     visiblePages.sort(
//       (b, a) =>
//         new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
//     )

//     return (
//       <div>
//         <ul>
//           {visiblePages.map(page => (
//             <li
//               key={page.path}
//               style={{
//                 marginBottom: '10px',
//               }}
//             >
//               <Link style={{ boxShadow: 'none' }} to={page.path}>
//                 {get(page, 'data.title', page.path)}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }

// BlogIndex.propTypes = {
//   route: React.PropTypes.object,
// }

// export default BlogIndex
