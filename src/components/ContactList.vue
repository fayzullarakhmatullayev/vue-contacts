<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="`heading${contact.id}`">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse${contact.id}`"
        aria-expanded="false"
        :aria-controls="`collapse${contact.id}`"
        data-bs-parent="#accordion"
      >
        <strong>{{ contact.name }}</strong>
      </button>
    </h2>
    <div
      :id="`collapse${contact.id}`"
      class="accordion-collapse collapse"
      :aria-labelledby="`heading${contact.id}`"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <div class="d-flex justify-content-between mb-3">
          <div style="width: 49%">
            <h5>Телефон</h5>
            <ul class="list-group">
              <li
                v-for="phone in contact.phones"
                :key="phone.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ phone.phone }}
                <a
                  :href="`tel:${phone.phone}`"
                  class="d-flex justify-content-end"
                  ><img
                    src="../assets/icons8-phone.svg"
                    alt="phone"
                    class="w-50 h-50"
                /></a>
              </li>
            </ul>
          </div>
          <div style="width: 49%">
            <h5>Электронная почта</h5>
            <ul class="list-group">
              <li
                v-for="email in contact.emails"
                :key="email.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ email.email }}
                <a
                  :href="`mailto:${email.email}`"
                  class="d-flex justify-content-end"
                  ><img
                    src="../assets/icons8-mail.svg"
                    alt="email"
                    class="w-50 h-50"
                /></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-secondary"
            style="margin-right: 0.5rem"
            @click="$router.push(`/edit-contact/${contact.key}`)"
          >
            Изменит контакт
          </button>
          <button
            class="btn btn-danger"
            @click="$emit('handleDelete', contact.key)"
          >
            Удалить контакт
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contact"],
  emits: ["handleDelete"],
};
</script>

<style></style>
