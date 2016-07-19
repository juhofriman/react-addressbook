var React = require('react');
var eb = require('./eventbus.js');

module.exports  = React.createClass({
  addNewContact: function() {
    var contact = { firstname: this.refs.firstname.value, lastname: this.refs.lastname.value, phone: this.refs.phone.value};
    eb.publish('CREATE_NEW_CONTACT', contact);
  },
  render: function() {
    return (
      <div>
        <div className="control-group column-group">
            <label htmlFor="first-name" className="all-20">First name</label>
            <div className="control all-80">
                <input type="text" ref="firstname" name="first-name" id="first-name"/>
            </div>
        </div>
        <div className="control-group column-group">
            <label htmlFor="first-name" className="all-20">Last name</label>
            <div className="control all-80">
                <input type="text" ref="lastname" name="last-name" id="last-name"/>
            </div>
        </div>
        <div className="control-group column-group">
            <label htmlFor="phone" className="all-20">Phone</label>
            <div className="control all-80">
                <input type="text" ref="phone" name="phone" id="phone"/>
            </div>
        </div>
        <button className="ink-button red push-right" onClick={this.addNewContact}>Add</button>
      </div>
    );
  }
});
