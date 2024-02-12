import PropTypes from 'prop-types';
import React from 'react';
import css from './Filter.module.css';

export const Filter = ({ filter, setFilter }) => {
  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>
        Filter by name:
        <input
          className={css.inputText}
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
