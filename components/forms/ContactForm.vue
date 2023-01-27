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
          <span class="error-msg" v-if="v$.$dirty && v$.personName.$error">
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
            v-model="mail"
          />
          <span class="error-msg" v-if="v$.$dirty && v$.mail.$error">
            {{ v$.mail.$errors[0].$message }}
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
          <span class="error-msg" v-if="v$.$dirty && v$.message.$error">
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
import { reactive, ref } from "vue";
export default {
  name: "ContactForm",
  props: ["buttonColor"],
  setup() {
    const personName = ref("");
    const mail = ref("");
    const message = ref("");

    const rules = {
      personName: {
        required: helpers.withMessage("Please enter you name", required),
      },
      mail: {
        email,
        required: helpers.withMessage(
          "Please enter your email address",
          required
        ),
      },
      message: {
        required: helpers.withMessage("Please enter a message", required),
      },
    };

    const v$ = useVuelidate(rules, { personName, mail, message });

    async function onSubmit() {
      v$.value.$validate();
      const supabase = useSupabaseClient();

      if (v$.value.$error) return;

      try {
        const resp = await supabase.from("contact").insert({
          name: personName.value,
          email: mail.value,
          message: message.value,
        });

        if (resp.error) throw resp.error;

        alert("Thanks for your message I will be in touch shortly");
        v$.value.$reset();
        personName.value = "";
        mail.value = "";
        message.value = "";
      } catch (error) {
        alert("There has been an error ", error);
      }
    }

    return { personName, mail, message, v$, onSubmit };
  },
};
</script>
