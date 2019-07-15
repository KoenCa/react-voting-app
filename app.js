/* eslint-disable no-undef */

const ProductList = React.createClass({
  render: function() {
    return (
      <div className="ui items">
        Hello, friend! I am a basic React component.
      </div>
    );
  }
});

ReactDOM.render(<ProductList />, document.getElementById("content"));
