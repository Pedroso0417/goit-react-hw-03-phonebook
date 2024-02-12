import React from 'react';
import css from './ContactListItem.module.css';
const ContactListItem = ({ contact, onDelete }) => {
  return (
    <div className={css.container}>
      <li className={css.contactName}>
        {contact.name}: {contact.number}
        <button className={css.contactId} onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      </li>
    </div>
  );
};

export default ContactListItem;
