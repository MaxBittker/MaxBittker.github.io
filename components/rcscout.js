import React, {PropTypes} from "react";
export default React.createClass({
  componentDidMount() {
    try{

    (function(w, d) {
      if (w._rcs) return;
      w._rcs = {token: '3a128824cb3dacb3e5bf25cec6f3b40e', type: 'logo_and_text'};
      var s = d.createElement('script');
      s.async = true;
      s.src = 'https://d29xw0ra2h4o4u.cloudfront.net/assets/scout-abf0d3bb3b3069aa3be4d42c386bc25aaf3e1c65c9ba702717b7118f8acdb221.js';
      d.body.appendChild(s);
      })(window, document);
    } catch(e){
      
    }

  },

  render() {
    return (
      <div className='rc-scout'>&nbsp;</div>
    );
  }
});
