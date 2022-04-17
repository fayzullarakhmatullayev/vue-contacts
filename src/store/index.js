import { createStore } from "vuex";

export default createStore({
  state: {
    contacts: [],
    contact: {},
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      if (contacts !== null) {
        state.contacts = Object.keys(contacts).map((key) => ({
          key,
          ...contacts[key],
        }));
      } else {
        state.contacts = contacts;
      }
    },
    SET_SINGLE_CONTACT(state, contact) {
      state.contact = contact;
    },
    SET_SINGLE_CONTACT_EMPTY(state) {
      state.contact = {};
    },
  },
  actions: {
    async postContact(_, contact) {
      try {
        await fetch(
          "https://vue-contacts-fbbfb-default-rtdb.firebaseio.com/contacts.json",
          {
            method: "POST",
            body: JSON.stringify(contact),
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    async fetchContacts({ commit }) {
      try {
        const res = await fetch(
          "https://vue-contacts-fbbfb-default-rtdb.firebaseio.com/contacts.json"
        );
        const body = await res.json();
        commit("SET_CONTACTS", body);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteContact(_, key) {
      try {
        await fetch(
          `https://vue-contacts-fbbfb-default-rtdb.firebaseio.com/contacts/${key}.json`,
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSingleContact({ commit }, key) {
      try {
        const res = await fetch(
          `https://vue-contacts-fbbfb-default-rtdb.firebaseio.com/contacts/${key}.json`
        );
        const body = await res.json();
        commit("SET_SINGLE_CONTACT", body);
      } catch (error) {
        console.error(error);
      }
    },
    async editContact(_, { key, payload }) {
      try {
        await fetch(
          `https://vue-contacts-fbbfb-default-rtdb.firebaseio.com/contacts/${key}.json`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});
