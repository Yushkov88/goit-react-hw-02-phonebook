import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.push({ id: nanoid(), name: name, number: number });
    this.setState({ contacts: contacts });
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const { handleChange, handleDelete, formSubmitHandler } = this;
    const contactsFiltered = [];
    contacts.forEach(contact => {
      contact.name.toLowerCase().includes(filter.toLowerCase()) &&
        contactsFiltered.push(contact);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm formSubmitHandler={formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        {contactsFiltered && (
          <ContactList
            contacts={contactsFiltered}
            handleDelete={handleDelete}
          />
        )}
      </div>
    );
  }
}
