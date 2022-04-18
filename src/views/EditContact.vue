<template>
  <h2 class="text-center py-4">Изменит контакт</h2>
  <loader v-if="!Object.keys(contact).length" />
  <form @submit.prevent="submitHandler" v-else>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Имя"
        v-model="singleContact.name"
        required
      />
    </div>
    <div
      v-for="(phone, index) in singleContact.phones"
      :key="phone.id"
      class="mb-2 d-flex justify-content-between"
    >
      <input
        type="tel"
        class="form-control"
        :placeholder="
          singleContact.phones.length > 1 ? `Телефон ${index + 1}` : 'Телефон'
        "
        @input="getPhoneInputValue($event, index)"
        :value="phone.phone"
        required
      />
      <button
        class="btn btn-danger"
        style="margin-left: 0.5rem"
        v-if="singleContact.phones.length > 1"
        @click.prevent="deleteInputPhone(phone.id)"
      >
        <delete-svg />
      </button>
    </div>

    <a href="#" class="my-2 d-block" @click="addPhone"
      >Добавить номер телефона</a
    >

    <div
      v-for="(email, index) in singleContact.emails"
      :key="email.id"
      class="mb-2 d-flex justify-content-between"
    >
      <input
        type="email"
        class="form-control"
        :value="email.email"
        required
        @input="getEmailInputValue($event, index)"
        :placeholder="
          singleContact.emails.length > 1
            ? `Электронная почта ${index + 1}`
            : 'Электронная почта'
        "
      />
      <button
        class="btn btn-danger"
        style="margin-left: 0.5rem"
        v-if="singleContact.emails.length > 1"
        @click.prevent="deleteInputEmail(email.id)"
      >
        <delete-svg />
      </button>
    </div>

    <a href="#" class="my-2 d-block" @click="addEmail"
      >Добавить электронную почту</a
    >

    <div
      v-for="(address, index) in singleContact.addresses"
      :key="address.id"
      class="mb-2 d-flex justify-content-between"
    >
      <input
        type="text"
        class="form-control"
        required
        @input="getAddressInputValue($event, index)"
        :value="address.address"
        :placeholder="
          singleContact.addresses.length > 1 ? `Адрес ${index + 1}` : 'Адрес'
        "
      />
      <button
        class="btn btn-danger"
        style="margin-left: 0.5rem"
        v-if="singleContact.addresses.length > 1"
        @click.prevent="deleteInputAddress(address.id)"
      >
        <delete-svg />
      </button>
    </div>

    <a href="#" class="my-2 d-block" @click="addAddress">Добавить адрес</a>

    <div class="d-flex justify-content-end mt-5">
      <button
        class="btn btn-danger"
        @click.prevent="$router.push('/')"
        style="margin-right: 0.5rem"
      >
        Отмена
      </button>
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import DeleteSvg from "@/components/DeleteSvg.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: { DeleteSvg, Loader },
  data() {
    return {
      singleContact: {},
    };
  },
  computed: {
    ...mapState(["contact"]),
    ...mapMutations(["SET_SINGLE_CONTACT_EMPTY"]),
  },
  methods: {
    ...mapActions(["fetchSingleContact", "editContact"]),
    addPhone() {
      this.singleContact.phones.push({ phone: "", id: Date.now() });
    },
    addEmail() {
      this.singleContact.emails.push({ email: "", id: Date.now() });
    },
    addAddress() {
      this.singleContact.addresses.push({ address: "", id: Date.now() });
    },
    getPhoneInputValue(e, idx) {
      return (this.singleContact.phones[idx].phone = e.target.value);
    },
    getEmailInputValue(e, idx) {
      return (this.singleContact.emails[idx].email = e.target.value);
    },
    getAddressInputValue(e, idx) {
      return (this.singleContact.addresses[idx].address = e.target.value);
    },
    deleteInputPhone(id) {
      this.singleContact.phones = this.singleContact.phones.filter(
        (phone) => phone.id !== id
      );
    },
    deleteInputAddress(id) {
      this.singleContact.addresses = this.singleContact.addresses.filter(
        (address) => address.id !== id
      );
    },
    deleteInputEmail(id) {
      this.singleContact.emails = this.singleContact.emails.filter(
        (email) => email.id !== id
      );
    },
    async submitHandler() {
      await this.editContact({
        key: this.$route.params.key,
        payload: this.singleContact,
      }).then(() => {
        this.SET_SINGLE_CONTACT_EMPTY;
        this.$router.push("/");
      });
    },
  },
  async mounted() {
    await this.fetchSingleContact(this.$route.params.key).then(
      () => (this.singleContact = this.contact)
    );
  },
  beforeUnmount() {
    this.SET_SINGLE_CONTACT_EMPTY;
  },
};
</script>

<style></style>
