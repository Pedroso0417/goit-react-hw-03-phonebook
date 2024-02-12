import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactList.module.css';
export const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul className={css.filterContact}>
      {filteredContacts.map(contact => (
        <li className={css.filterNumber} key={contact.id}>
          {contact.name}: {contact.number}
          <button
            className={css.filterDelete}
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
