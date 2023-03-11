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
  <div v-if="contactSuccess" class="contact-modal">
    <div class="contact-modal__inner">
      <div class="contact-modal__body">
        <h3>{{ modal.heading }}</h3>
        <p>{{ modal.text1 }}</p>
        <p>{{ modal.text2 }}</p>
        <div class="modal__footer">
          <div class="btn btn--orange" @click="handleModalClose">Close</div>
        </div>
      </div>
    </div>
  </div>
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
    const contactSuccess = ref(false);
    const modal = ref({
      heading: "Thanks",
      text1: "Thank you for your enquiry",
      text2: "I will be in touch shortly",
    });

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

        contactSuccess.value = true;
        v$.value.$reset();
        personName.value = "";
        mail.value = "";
        message.value = "";
      } catch (error) {
        contactSuccess.value = true;
        modal.value.heading = "Error";
        modal.value.text1 = "There looks like there has been an error";
        modal.value.text2 =
          "Please try again, if the problem persists - email me at sandrajplumb@gamil.com";
      }
    }

    function handleModalClose() {
      contactSuccess.value = false;
      modal.value.heading = "Thanks";
      modal.value.text1 = "Thank you for your enquiry";
      modal.value.text2 = "I will be in touch shortly";
    }

    return {
      personName,
      mail,
      message,
      v$,
      modal,
      contactSuccess,
      onSubmit,
      handleModalClose,
    };
  },
};
</script>

<style lang="scss">
.contact-modal {
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background: #fff;
    max-width: 30rem;
    padding: 2rem;
    margin: 2rem;
  }

  &__body {
    text-align: center;
    h3 {
      font-size: 2rem;
    }
  }
}
</style>
