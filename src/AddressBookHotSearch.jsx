var React = require('react');
var eb = require('./eventbus.js');

module.exports  = React.createClass({
  foo: function() {
    eb.publish('HOTSEARCH_CHANGE', this.refs.searchInput.value);
  },
  render: function() {
    return (
      <div className="ink-form">
        <div className="control-group column-group">
          <div className="control all-100">
            <input ref="searchInput" type="text" name="name" id="name" onChange={this.foo}/>
          </div>
        </div>
      </div>
    );
  }
});
