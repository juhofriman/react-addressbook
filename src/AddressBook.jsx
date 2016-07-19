var React = require('react');
var AddressListing = require('./AddressListing.jsx');
var AddressBookStatistics = require('./AddressBookStatistics.jsx');
var AddressBookHotSearch = require('./AddressBookHotSearch.jsx');
var NewContactForm = require('./NewContactForm.jsx');
var eb = require('./eventbus.js');

module.exports  = React.createClass({
  // This is the heart of everything, the single source of truth, the app database
  getInitialState: function() {
    return {
      contacts: [
        {firstname: "John", lastname: "Keller", phone: "050-233456"},
        {firstname: "Mark", lastname: "Miller", phone: "050-3435353"},
        {firstname: "Ada", lastname: "Malkoller", phone: "050-262662"}],
      hotsearch: '' };
  },
  componentDidMount: function() {
    eb.on(this, 'HOTSEARCH_CHANGE', function(currentSearch) {
      this.setState({hotsearch: currentSearch});
    });
    eb.on(this, 'CREATE_NEW_CONTACT', function(newContact) {
      var c = this.state.contacts;
      this.setState({contacts: c.concat([newContact])});
    });
  },
  filteredContacts: function() {
    if(this.state.hotsearch === '') {
      return this.state.contacts;
    }
    return this.state.contacts.filter(function(contact) {
      return contact.lastname.indexOf(this.state.hotsearch) > -1
    }.bind(this));
  },
  countContacts: function() {
    return this.state.contacts.length;
  },
  render: function() {
    return (
      <div>
        <h1>Awesome react datastream address book</h1>
          <div className="ink-grid">
            <div className="column-group horizontal-gutters">
              <div className="all-50">
                <AddressBookHotSearch />
                <AddressListing contacts={this.filteredContacts()}/>
                <button className="ink-button red push-right small">Enable deletes</button>
                <AddressBookStatistics contactCount={this.countContacts()}/>
              </div>
              <div className="all-50">
                <div className="ink-form">
                  <h4>Add new contact</h4>
                  <NewContactForm/>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
});
