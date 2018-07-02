module.exports = {
  siteMetadata: {
    title: "max-bittker"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-less",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "markdown-pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants"
        ]
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/components/typography.js`
      }
    }
  ]
};
