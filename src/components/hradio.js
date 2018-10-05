import React, {PropTypes} from 'react';
const HRadio = React.createClass({
  render() {
    let {n} = this.props;
    let array = Array.from(Array(n).keys());
    return (
    <span className="hradio">
    {array.map(i=>(<input key={i} type="radio" defaultChecked={i%2}/>))}
    </span>
    );
  }
});
export default HRadio;