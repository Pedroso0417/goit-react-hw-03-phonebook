import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactList.module.css';
export const ContactList = ({ filterContact, deleteContact }) => {
  const filteredContacts = filterContact();

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
  filterContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
