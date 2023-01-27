<template>
  <!-- <Auth /> -->

  <div class="container mt-5">
    <form @submit.prevent="onSubmit" class="mt-5 show-login">
      <h1 class="text-center mb-5">Please Login In</h1>
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-sm-10 col-md-6">
          <div class="row">
            <div class="col-12 text-center" v-if="showError">
              <p class="my-3 error font-weight-bold">{{ errorText }}</p>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="email">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="password">password:</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  v-model="password"
                  required
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
import "./scss/admin-form.scss";

export default {
  name: "AdminForm",
  props: {
    showError: Boolean,
    errorText: String,
  },
  emits: ["onFormSubmit"],
  setup(props, ctx) {
    const email = ref(null);
    const password = ref(null);

    function onSubmit() {
      ctx.emit("onFormSubmit", email.value, password.value);
      email.value = null;
      password.value = null;
    }

    return {
      email,
      password,
      onSubmit,
    };
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/mixins.scss";
.show-login {
  @include pos-abs-center;
  width: 100%;
}

.form--btn {
  button {
    display: block;
    margin-left: auto;
  }
}
</style>
