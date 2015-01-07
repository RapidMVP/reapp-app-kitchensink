var React = require('react');
var AnimatableContainer = require('reapp-ui/helpers/AnimatableContainer');
var EasingFunctions = require('reapp-ui/lib/EasingFunctions');
var ImageCard = require('./ImageCard');

var ImageCardContainer = React.createClass({
  styles: {
     backfaceVisibility: 'hidden',
     WebkitBackfaceVisibility: 'hidden',
     MozBackfaceVisibility: 'hidden',
     position: 'absolute',
     left: 0,
     top: 0,
  },

  render() {
    var { left, index, width, ...props } = this.props;

    var pct = (left - (index * width)) / width;
    var x = index * width - left;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = left > index * width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    var animatableStyles = Object.assign(this.styles, { width });

    return (
      <AnimatableContainer
        className="ImageCardContainer"
        style={animatableStyles}
        opacity={EasingFunctions.easeOutCubic(1 - Math.abs(pct))}
        rotate={{y: yAxis, deg: deg}}
        translate={{x: x, z: z}}>
        <ImageCard {...props} />
      </AnimatableContainer>
    );
  }
});

module.exports = ImageCardContainer;