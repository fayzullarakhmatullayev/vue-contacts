<template>
  <h2 class="text-center py-4">Контакты</h2>

  <div class="row d-flex align-items-center justify-content-between mb-3">
    <div class="col-md-4">
      <input
        type="search"
        class="form-control"
        placeholder="Поиск"
        v-model="searchedName"
      />
    </div>
    <div class="col-md-4 d-flex justify-content-end">
      <router-link to="/add-contact"
        ><button type="button" class="btn btn-primary">
          Добавить контакт
        </button></router-link
      >
    </div>
  </div>
  <loader v-if="!contacts.length" />
  <div class="accordion mb-5" id="accordion" v-else>
    <contact-list
      v-for="contact in filteredContacts"
      :key="contact.id"
      :contact="contact"
      @handleDelete="handleDelete"
    />
  </div>
</template>

<script>
import ContactList from "../components/ContactList.vue";
import Loader from "../components/Loader.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { ContactList, Loader },
  data() {
    return {
      searchedName: "",
    };
  },
  computed: {
    ...mapState(["contacts", "contact"]),
    filteredContacts() {
      if (this.contacts) {
        if (this.searchedName !== "") {
          return this.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(this.searchedName.toLowerCase())
          );
        } else {
          return this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            return 1;
          });
        }
      }
    },
  },
  methods: {
    ...mapActions(["fetchContacts", "deleteContact"]),
    async handleDelete(key) {
      await this.deleteContact(key).then(() => this.fetchContacts());
    },
  },
  async mounted() {
    await this.fetchContacts();
  },
};
</script>
