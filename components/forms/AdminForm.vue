<template>
  <div class="container mt-5">
    <form @submit.prevent="onSubmit">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-sm-10 col-md-6">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="email">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  id="email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  v-model="email"
                />
              </div>
            </div>
          </div>
          <div class="form--btn">
            <button class="btn btn-primary btn--orange">Submit</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "AdminForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("Submittin");
    },
  },
};
</script>

<style lang="scss" scoped></style>
