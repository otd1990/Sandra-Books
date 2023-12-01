<template>
  <div class="container">
    <h1 class="text-center">Manage Contact</h1>
    <p class="text-center">
      Below is a list of people who will have filled out the form to get in
      touch with you on the website
    </p>
    <div v-if="contactData">
      <div class="contact-data__wrap">
        <div v-for="contact in contactData" :key="contact.id" class="contact">
          <p class="contact__message"><h5>Message: </h5>{{ contact.message }}</p>
          <p class="contact__info">
            <span class="contact__name"><h5>Name:</h5>{{ contact.name }}</span>
            <span class="contact__email"
              ><h5>Email:</h5>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></span
            >
            <span class="contact__date"
              ><h5>Contact Date:</h5>
              {{
                new Date(contact.created_at).toLocaleDateString("en-GB")
              }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">No one has filled out the form yet</p>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useBooksStore } from "@/store/BooksStore";
import { storeToRefs } from "pinia";

import "./scss/manage-contact.scss";

export default {
  name: "ManageContactPage",
  setup() {
    const bookStore = useBooksStore();
    const { contactData } = storeToRefs(bookStore);


    onMounted(async () => {
      try {
        if (!bookStore.contactData) {
          await bookStore.getContactData();

        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    });

    return { contactData };
  },
};
</script>

<style lang="scss" scoped></style>
