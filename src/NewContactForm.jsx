var React = require('react');
var eb = require('./eventbus.js');

var FormInput = React.createClass({
  triggerChangeEvent: function() {
    // Publish event signaling that field has changed so the state should be updated
    eb.publish('ADD_NEW_CONTACT_FIELD_CHANGE', this.props.id, this.refs.fieldValue.value);
  },
  render: function() {
    return (
      <input ref="fieldValue" value={this.props.value} type={this.props.type} name={this.props.id} id={this.props.id} onChange={this.triggerChangeEvent}/>
    );
  }
});

module.exports  = React.createClass({
  addNewContact: function() {
    // Notice how we don't need to read the data anymore.
    // Trust the state!
    eb.publish('CREATE_NEW_CONTACT');
  },
  commitButtonClasses: function() {
    return "ink-button push-right " + (this.props.canCommit ? 'green' : 'red');
  },
  render: function() {
    return (
      <div>
        <div className="control-group column-group">
            <label htmlFor="first-name" className="all-20">First name</label>
            <div className="control all-80">
                <FormInput type="text" id="firstname" value={this.props.data.firstname}/>
            </div>
        </div>
        <div className="control-group column-group">
            <label htmlFor="first-name" className="all-20">Last name</label>
            <div className="control all-80">
                <FormInput type="text" id="lastname" value={this.props.data.lastname}/>
            </div>
        </div>
        <div className="control-group column-group">
            <label htmlFor="phone" className="all-20">Phone</label>
            <div className="control all-80">
                <FormInput type="text" id="phone" value={this.props.data.phone}/>
            </div>
        </div>
        <button className={this.commitButtonClasses()} disabled={!this.props.canCommit} onClick={this.addNewContact}>Add</button>
      </div>
    );
  }
});
