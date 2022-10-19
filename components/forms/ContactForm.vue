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
          <span
            class="error-msg"
            v-if="v$.personName !== '' && v$.personName.$error"
          >
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
          <span class="error-msg" v-if="v$.email !== '' && v$.email.$error">
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
          <span class="error-msg" v-if="v$.message !== '' && v$.message.$error">
            {{ v$.message.$errors[0].$message }}
          </span>
        </div>
      </div>
    </div>
    <div class="form--btn">
      <button
        class="btn ms-auto"
        :class="buttonColor ? 'btn--orange' : 'btn--beige'"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "ContactForm",
  props: ["buttonColor"],
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
    async onSubmit() {
      this.v$.$validate();
      const supabase = useSupabaseClient();

      if (this.v$.$error) return;

      try {
        const resp = await supabase.from("contact").insert({
          name: this.personName,
          email: this.email,
          message: this.message,
        });

        if (resp.error) throw resp.error;

        console.log("RESP ", resp);

        alert("Thanks for your message I will be in touch shortly");

        this.personName = "";
        this.email = "";
        this.message = "";
      } catch (error) {
        alert("There has been an error ", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
