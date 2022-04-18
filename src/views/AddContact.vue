<template>
  <h2 class="text-center py-4">Создать новый контакт</h2>
  <form @submit.prevent="submitHandler">
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Имя"
        v-model="name"
        required
      />
    </div>
    <div
      v-for="(phone, index) in phones"
      :key="phone.id"
      class="mb-2 d-flex justify-content-between"
    >
      <input
        type="tel"
        class="form-control"
        :placeholder="phones.length > 1 ? `Телефон ${index + 1}` : 'Телефон'"
        @input="getPhoneInputValue($event, index)"
        required
      />
      <button
        class="btn btn-danger"
        style="margin-left: 0.5rem"
        v-if="phones.length > 1"
        @click.prevent="deleteInputPhone(phone.id)"
      >
        <delete-svg />
      </button>
    </div>

    <a href="#" class="my-2 d-block" @click="addPhone"
      >Добавить номер телефона</a
    >

    <div
      v-for="(email, index) in emails"
      :key="email.id"
      class="mb-2 d-flex justify-content-between"
    >
      <input
        type="email"
        class="form-control"
        required
        @input="getEmailInputValue($event, index)"
        :placeholder="
          emails.length > 1
            ? `Электронная почта ${index + 1}`
            : 'Электронная почта'
        "
      />
      <button
        class="btn btn-danger"
        style="margin-left: 0.5rem"
        v-if="emails.length > 1"
        @click.prevent="deleteInputEmail(email.id)"
      >
        <delete-svg />
      </button>
    </div>

    <a href="#" class="my-2 d-block" @click="addEmail"
      >Добавить электронную почту</a
    >
    <div
      v-for="(address, index) in addresses"
      :key="address.id"
      class="mb-2 d-flex justify-content-between"
    >
      <input
        type="text"
        class="form-control"
        required
        @input="getAddressInputValue($event, index)"
        :placeholder="addresses.length > 1 ? `Адрес ${index + 1}` : 'Адрес'"
      />
      <button
        class="btn btn-danger"
        style="margin-left: 0.5rem"
        v-if="addresses.length > 1"
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
import DeleteSvg from "@/components/DeleteSvg.vue";
import { mapActions } from "vuex";
export default {
  components: { DeleteSvg },
  data() {
    return {
      name: "",
      phones: [{ phone: "", id: Date.now() }],
      emails: [{ email: "", id: Date.now() }],
      addresses: [{ address: "", id: Date.now() }],
    };
  },
  methods: {
    ...mapActions(["postContact"]),
    addPhone() {
      this.phones.push({ phone: "", id: Date.now() });
    },
    addEmail() {
      this.emails.push({ email: "", id: Date.now() });
    },
    addAddress() {
      this.addresses.push({ address: "", id: Date.now() });
    },
    getPhoneInputValue(e, idx) {
      return (this.phones[idx].phone = e.target.value);
    },
    getEmailInputValue(e, idx) {
      return (this.emails[idx].email = e.target.value);
    },
    getAddressInputValue(e, idx) {
      return (this.addresses[idx].address = e.target.value);
    },
    deleteInputPhone(id) {
      this.phones = this.phones.filter((phone) => phone.id !== id);
    },
    deleteInputEmail(id) {
      this.emails = this.emails.filter((email) => email.id !== id);
    },
    deleteInputAddress(id) {
      this.addresses = this.addresses.filter((address) => address.id !== id);
    },
    submitHandler() {
      this.postContact({
        id: Date.now(),
        name: this.name,
        phones: this.phones,
        addresses: this.addresses,
        emails: this.emails,
      }).then(() => this.$router.push("/"));
    },
  },
};
</script>

<style></style>
