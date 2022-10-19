<template>
  <div class="container mb-5">
    <h1 class="text-center">Contact</h1>
    <p class="text-center">
      If you'd like to get in touch please do so by filling out the form below.
      I try to answer all queries as quickly as possible
    </p>
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <ContactForm :buttonColor="true" />
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from "@/components/forms/ContactForm";
export default {
  components: {
    ContactForm,
  },
};
</script>

<style lang="scss" scoped></style>
