import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    // Use nanoid to generate a unique ID
    const id = nanoid();

    // Check if the contact with the same name or number already exists
    const contactExists = this.props.contacts.some(
      contact => contact.name === name || contact.number === number
    );

    if (contactExists) {
      alert('Contact with the same name or number already exists.');
      return;
    }

    // Add the new contact with the generated ID
    this.props.addContact({ id, name, number });

    // Reset the form
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.formSubmit} onSubmit={this.handleSubmit}>
        <label className={css.formLabel}>
          Name:
          <input
            className={css.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={css.formLabel}>
          Number:
          <input
            className={css.formInput}
            type="text"
            name="number"
            pattern="[\d\s\-\+\(\)]{9,}"
            title="Phone number must be at least 9 digits and can contain spaces, dashes, parentheses, and the plus sign."
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button className={css.submit} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
