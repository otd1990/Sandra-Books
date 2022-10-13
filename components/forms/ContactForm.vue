<template>
  <form @submit.prevent="onSubmit">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="form-label" for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            v-model="personName"
          />
          <span class="error-msg" v-if="v$.personName.$error">
            {{ v$.personName.$errors[0].$message }}
          </span>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="form-label" for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="email"
            v-model="email"
          />
          <span class="error-msg" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label class="form-label" for="message">Your Message:</label>
          <textarea
            name="message"
            class="form-control"
            id="message"
            cols="30"
            rows="5"
            v-model="message"
          ></textarea>
          <span class="error-msg" v-if="v$.message.$error">
            {{ v$.message.$errors[0].$message }}
          </span>
        </div>
      </div>
    </div>
    <div class="form--btn">
      <button class="btn btn-primary btn--beige">Submit</button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "ContactForm",
  data() {
    return {
      v$: useVuelidate(),
      personName: "",
      email: "",
      message: "",
    };
  },
  validations() {
    return {
      email: {
        email,
        required: helpers.withMessage(
          "Please enter your email address",
          required
        ),
      },
      personName: {
        required: helpers.withMessage("Please enter you name", required),
      },
      message: {
        required: helpers.withMessage("Please enter a message", required),
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.v$);
      this.v$.$validate();

      if (this.v$.$error) {
        console.log(this.v$.$error);
      }

      console.log("Submitting form data ", this.email);
    },
  },
};
</script>

<style lang="scss" scoped></style>
