/* eslint-disable no-undef */
// Pagina 50 van PDF

const Product = React.createClass({
  handleUpvote: function() {
    this.props.onVote(this.props.id, true);
  },

  handleDownVote: function() {
    this.props.onVote(this.props.id, false);
  },

  render: function() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.product_image_url} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpvote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className="large caret down icon" />
            </a>
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  }
});

const ProductList = React.createClass({
  getInitialState: function() {
    /*
      Have an initial empty state so component can render first and then request
      data in componendDidMount.
    */
    return {
      products: []
    };
  },

  componentDidMount: function() {
    this.updateState();
  },

  updateState: function() {
    const products = Data.sort((a, b) => {
      return b.votes - a.votes;
    });

    this.setState({ products: products });
  },

  handleProductVote: function(productId, isUpvote) {
    // First update the data (for example: API)
    Data.forEach(product => {
      if (product.id !== productId) return;
      if (isUpvote)
        product.votes = product.votes + 1;
      else
        product.votes = product.votes - 1;
    });

    // Then fetch the updated data and render it
    this.updateState();
  },

  render: function() {
    const products = this.state.products.map(product => {
      return (
        <Product
          key={"product-" + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleProductVote}
        />
      );
    });
    return <div className="ui items">{products}</div>;
  }
});

// Apply our component to the DOM and render it
ReactDOM.render(<ProductList />, document.getElementById("content"));
