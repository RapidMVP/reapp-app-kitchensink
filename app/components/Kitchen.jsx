var Component = require('component');
var React = require('react');
var { Link } = require('react-router');
var Layout = require('./Layout');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var View = require('reapp-ui/views/View');
var SearchBar = require('reapp-ui/components/SearchBar');
var List = require('reapp-ui/components/List');
var ListItem = require('reapp-ui/components/ListItem');
var Title = require('reapp-ui/components/Title');
var Badge = require('reapp-ui/components/Badge');

var InertLink = React.createClass({
  displayName: 'Link',
  render() { return <Link {...this.props} activeClassName="" />; }
});

module.exports = Component({
  mixins: [
    Component.mixins.routedViewListHandler
  ],

  getInitialState() {
    return {
      searchVal: ''
    };
  },

  handleSearch(e) {
    this.setState({ searchVal: e.target.value });
  },

  filteredLinks(links) {
    var search = RegExp(this.state.searchVal, 'i');
    var filteredLinks = links.filter(link => !!link[1].match(search));
    return filteredLinks.map(this.makeLink);
  },

  makeLink(link) {
    return (
      <ListItem
        wrapper={<InertLink to={link[0]} />}
        after={link[2] && <Badge styles={{self: { background: 'red' } }}>!</Badge>}>
        {link[1]}
      </ListItem>
    );
  },

  interfaceLinks: [
    ['controls', 'Controls'],
    ['lists', 'Lists'],
    ['modals', 'Modals'],
    ['popovers', 'Popovers'],
    ['cards', 'Cards'],
    ['forms', 'Forms'],
    ['tabs', 'Tabs'],
    ['grids', 'Grid'],
    ['panels', 'Drawers']
  ],

  viewLinks: [
    ['view-lists', 'View List'],
    ['dotted-view-lists', 'Dotted View List'],
    ['view-frosted', 'Frosted Glass Titlebar', true]
  ],

  render() {
    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;

    return (
      <Layout>
        <NestedViewList {...this.routedViewListProps()}>
          <View title={[this.props.handle, 'Kitchen Sink']}>
            <SearchBar onChange={this.handleSearch} defaultValue="" />

            <Title>Interface</Title>
            <List>
              {this.filteredLinks(this.interfaceLinks)}
            </List>

            <Title>Views</Title>
            <List>
              {this.filteredLinks(this.viewLinks)}
            </List>
          </View>

          {this.routedSubRoute()}
        </NestedViewList>
      </Layout>
    );
  }
});