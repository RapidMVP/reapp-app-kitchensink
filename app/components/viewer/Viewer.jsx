var ImageCardContainer = require('./ImageCardContainer');
var React = require('react');
var ReactStyle = require('react-style');
var TouchableArea = require('ui/helpers/TouchableArea');
var { Scroller } = require('scroller');

var Viewer = React.createClass({
  styles: ReactStyle({
    'background': 'black',
    'overflow': 'hidden',
    'perspective': '500px',
    '-webkit-perspective': '500px',
    '-moz-perspective': '500px',
  }),

  componentWillMount() {
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
    });
  },

  componentDidMount() {
    this.scroller.setDimensions(
      this.props.width,
      this.props.height,
      this.props.width * this.props.images.urls.length,
      this.props.height
    );
    this.scroller.setSnapSize(this.props.width, this.props.height);
  },

  getInitialState() {
    return {left: 0};
  },

  handleScroll(left, top, zoom) {
    this.setState({left: left});
  },

  render() {
    var images = this.props.images.urls.map(function(url, i) {
      if (this.state.left < (i - 1) * this.props.width ||
          this.state.left > (i + 1) * this.props.width) {
        return null;
      }

      // Find the highest resolution image
      return (
        <ImageCardContainer
          left={this.state.left}
          key={i}
          index={i}
          url={url}
          width={this.props.width}
          height={this.props.height} />
      );
    }, this);

    return (
      <TouchableArea
        className="Viewer"
        style={{width: this.props.width, height: this.props.height}}
        styles={this.styles}
        scroller={this.scroller}>
        {images}
      </TouchableArea>
    );
  }
});

module.exports = Viewer;