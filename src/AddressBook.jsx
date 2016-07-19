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
      hotsearch: '',
      forms: {
        addNewContact: {
          firstname: '',
          lastname: '',
          phone: ''
        }
      }};
  },
  componentDidMount: function() {

    eb.on(this, 'HOTSEARCH_CHANGE', function(currentSearch) {
      console.log('Dude! Hotsearch form change was received. Setting state.');
      this.setState({hotsearch: currentSearch});
    });

    eb.on(this, 'CREATE_NEW_CONTACT', function() {
      console.log("Create new contant event received. Great! Adding new contact from state <3 <3");
      var newState = this.state;
      // Add new contact to contacts
      newState.contacts = newState.contacts.concat([this.state.forms.addNewContact]);
      // Reset form!
      newState.forms.addNewContact = {
        firstname: '',
        lastname: '',
        phone: ''
      };
      // Set the state
      this.setState(newState);
    });

    eb.on(this, 'ADD_NEW_CONTACT_FIELD_CHANGE', function(fieldKey, fieldValue) {
      console.log("Awyea! State change in add new contact form! " + fieldKey + "=" + fieldValue);
      var newState = this.state;
      newState.forms.addNewContact[fieldKey] = fieldValue;
      this.setState(newState);
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
                  <NewContactForm data={this.state.forms.addNewContact}/>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
});
