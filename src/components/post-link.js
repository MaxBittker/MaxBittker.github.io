import React from "react";
import Link from "gatsby-link";
import HRadio from "./hradio.js";

const PostLink = ({ post }) => (
  <div style={{ margin: "0 1em " }}>
    <Link style={{ display: "flex" }} to={"/" + post.frontmatter.path}>
      <p style={{ flexGrow: 1 }}>
        {post.frontmatter.title}
        {post.frontmatter.video && ` [Video, ${post.frontmatter.video}] `}
      </p>

      <small style={{ whiteSpace: "nowrap", color: "black" }}>
        {post.frontmatter.date}
      </small>
    </Link>
  </div>
);

export default PostLink;
