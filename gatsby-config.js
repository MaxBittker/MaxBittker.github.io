module.exports = {
  siteMetadata: {
    title: "max-bittker"
  },
  plugins: [
    "gatsby-plugin-layout",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-remove-trailing-slashes",
    {
      resolve: `gatsby-plugin-less`,
      options: {
        cssLoaderOptions: {
          camelCase: false
        }
      }
    },
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
              maxWidth: 590,
              showCaptions: true,
              wrapperStyle: `text-decoration: none; background-image: none;`
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
