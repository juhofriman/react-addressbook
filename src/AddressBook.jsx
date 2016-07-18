var React = require('react');
var AddressListing = require('./AddressListing.jsx');

module.exports  = React.createClass({
  // This is the heart of everything, the single source of truth, the app database
  getInitialState: function() {
    return {
      contacts: [
        {firstname: "John", lastname: "Keller", phone: "050-233456"},
        {firstname: "Mark", lastname: "Miller", phone: "050-3435353"},
        {firstname: "Ada", lastname: "Malkoller", phone: "050-262662"}]
      };
  },
  render: function() {
    return (
      <div>
        <h1>Awesome react datastream address book</h1>
          <div className="ink-grid">
            <div className="column-group horizontal-gutters">
              <div className="all-50">
                <div className="ink-form">
                  <div className="control-group column-group">
                    <div className="control all-100">
                      <input type="text" name="name" id="name"/>
                    </div>
                  </div>
                </div>
                <AddressListing contacts={this.state.contacts}/>
                <button className="ink-button red push-right small">Enable deletes</button>
                <div>This book has<span className="ink-badge blue">39</span> contacts</div>
              </div>
              <div className="all-50">
                <div className="ink-form">
                  <h4>Add new contact</h4>
                  <div className="control-group column-group">
                      <label htmlFor="first-name" className="all-20">First name</label>
                      <div className="control all-80">
                          <input type="text" name="first-name" id="first-name"/>
                      </div>
                  </div>
                  <div className="control-group column-group">
                      <label htmlFor="first-name" className="all-20">Last name</label>
                      <div className="control all-80">
                          <input type="text" name="last-name" id="last-name"/>
                      </div>
                  </div>
                  <div className="control-group column-group">
                      <label htmlFor="phone" className="all-20">Phone</label>
                      <div className="control all-80">
                          <input type="text" name="phone" id="phone"/>
                      </div>
                  </div>
                  <button className="ink-button red">Add</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
});
