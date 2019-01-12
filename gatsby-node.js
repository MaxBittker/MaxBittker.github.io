const fs = require("fs");
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blogTemplate.js");
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next
            }
          });
        });
      })
    );
  });
};

var p = "./static/screenshots";
fs.readdir(p, function(err, files) {
  if (err) {
    throw err;
  }

  let data = files
    .filter(function(file) {
      return fs.statSync(path.join(p, file)).isFile();
    })
    .map(function(file) {
      return {
        name: "testTitle",
        loc: file
      };
    });
  fs.writeFileSync(
    path.join(__dirname, "src/pages/art.json"),
    JSON.stringify({ screenshots: data }, null, 4)
  );
});

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
