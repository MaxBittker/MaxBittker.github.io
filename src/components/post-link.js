import React from 'react'
import Link from 'gatsby-link'

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title} <small>({post.frontmatter.date}</small>)
    </Link>
  </div>
)

export default PostLink
