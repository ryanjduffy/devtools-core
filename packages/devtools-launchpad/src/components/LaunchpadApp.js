const React = require("react");
const { PropTypes } = React;
const { connect } = require("react-redux");
const { bindActionCreators } = require("redux");
const { getTabs, getFilterString } = require("../selectors");
const { getValue } = require("devtools-config");
const LandingPage = React.createFactory(require("./LandingPage"));

const LaunchpadApp = React.createClass({
  propTypes: {
    tabs: PropTypes.array,
    filterString: PropTypes.string,
    actions: PropTypes.array
  },

  displayName: "LaunchpadApp",

  render() {
    return LandingPage({
      tabs: this.props.tabs,
      supportsFirefox: !!getValue("firefox"),
      supportsChrome: !!getValue("chrome"),
      title: getValue("title"),
      filterString: this.props.filterString,
      onFilterChange: this.props.actions.filterTabs
    });
  }
});

function mapStateToProps(state) {
  return {
    tabs: getTabs(state),
    filterString: getFilterString(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(require("../actions"), dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchpadApp);
