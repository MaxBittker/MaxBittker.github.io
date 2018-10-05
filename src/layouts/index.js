import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { TypographyStyle, GoogleFont } from "react-typography";
import typography from "../components/typography";

import Header from "../components/header";
import Wrap from "../components/wrap";
import "./index.css";

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[{ name: "description", content: "Max's website" }]}>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Helmet>
    <div className="b-wrap fill" style={{ minHeight: "100vh" }}>
      <Wrap n={4} fill={true}>
        <div style={{width:"100%"}}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: "0 auto",
              maxWidth: 960,
              padding: "0px 1.0875rem 1.45rem",
              paddingTop: 0
            }}>
            {children()}
          </div>
        </div>
      </Wrap>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
