import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = localStorage.getItem('contacts');

      if (savedContacts) {
        // Check if the retrieved data is valid JSON
        const parsedContacts = JSON.parse(savedContacts);

        // Check if parsedContacts is an array before setting state
        if (Array.isArray(parsedContacts)) {
          this.setState({ contacts: parsedContacts });
        } else {
          console.error(
            'Invalid data format in localStorage. Expected an array.'
          );
        }
      }
    } catch (error) {
      console.error('Error retrieving contacts from localStorage:', error);
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      try {
        // Serialize the contacts array to JSON before storing in localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error('Error saving contacts to localStorage:', error);
      }
    }
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContact(); // Add this line to get filtered contacts

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={this.setFilter} />
        <ContactList
          filteredContacts={filteredContacts} // Pass the filtered contacts to ContactList
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
