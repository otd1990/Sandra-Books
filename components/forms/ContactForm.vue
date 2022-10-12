<template>
  <form @submit.prevent="onSubmit">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div
          class="form-group"
          :class="{ error: v$.form.personName.$errors.length }"
        >
          <label class="form-label" for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            v-model="v$.form.personName.$model"
          />
          <div
            class="input-errors"
            v-for="(error, index) of v$.form.personName.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div
          class="form-group"
          :class="{ error: v$.form.email.$errors.length }"
        >
          <label class="form-label" for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="email"
            v-model="v$.form.email.$model"
          />
          <div
            class="input-errors"
            v-for="(error, index) of v$.form.email.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div
          class="form-group"
          :class="{ error: v$.form.message.$errors.length }"
        >
          <label class="form-label" for="message">Your Message:</label>
          <textarea
            name="message"
            class="form-control"
            id="message"
            cols="30"
            rows="5"
            v-model="v$.form.message.$model"
            required
          ></textarea>
          <div
            class="input-errors"
            v-for="(error, index) of v$.form.message.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="form--btn">
      <button :disabled="v$.form.$invalid" class="btn btn-primary btn--beige">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "ContactForm",
  setup() {
    return {};
  },
  data() {
    return {
      form: {
        personName: "",
        email: "",
        message: "",
      },
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        personName: {
          required,
        },
        message: {
          required,
        },
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitting form data ", this.form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
