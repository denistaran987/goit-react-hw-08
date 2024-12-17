import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectEditData = state => state.contacts.editData;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, newName) => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(newName) || contact.number.includes(newName);
    });
  }
);
