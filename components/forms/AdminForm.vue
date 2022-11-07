<template>
  <div class="container mt-5">
    <form
      @submit.prevent="onSubmit"
      v-if="!loggedIn"
      class="mt-5"
      :class="!loggedIn ? 'show-login' : 'asdf'"
    >
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
    <div v-else>
      <button @click="handleLogout" class="btn btn--orange mt-5">
        Log Out
      </button>
      <div class="show-diff-forms">
        <nav class="show-diff-forms-nav">
          <ul class="show-diff-forms-list">
            <li class="show-diff-forms-list-item">
              <nuxt-link
                to="/admin/add-books"
                class="show-diff-forms-list--link"
                >Add A New Book</nuxt-link
              >
            </li>
            <li class="show-diff-forms-list-item">
              <nuxt-link
                to="/admin/manage-books"
                class="show-diff-forms-list--link"
                >Manage Books</nuxt-link
              >
            </li>
            <li class="show-diff-forms-list-item">
              <nuxt-link
                to="/admin/manage-reviews"
                class="show-diff-forms-list--link"
                >Manage Reviews</nuxt-link
              >
            </li>
            <li class="show-diff-forms-list-item">
              <nuxt-link
                to="/admin/manage-contact"
                class="show-diff-forms-list--link"
                >Manage Messages</nuxt-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- <Auth /> -->
  </div>
</template>

<script>
import "./scss/admin-form.scss";
import { useBooksStore } from "@/store/BooksStore";

export default {
  name: "AdminForm",
  data() {
    return {
      email: null,
      password: null,
      loggedIn: false,
      showError: false,
      errorText: "",
    };
  },
  created() {
    if (process.client) {
      const fromStoreage = localStorage.getItem("supabase.auth.token");
      this.loggedIn = fromStoreage ? true : false;
    }
  },
  methods: {
    async onSubmit() {
      const supabase = useSupabaseClient();
      const booksStore = useBooksStore();
      this.showError = false;
      this.errorText = "";

      try {
        const { data, error } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        booksStore.setUser(data);
        this.loggedIn = true;
        navigateTo("/admin/add-books");
      } catch (error) {
        console.error("Error Signing in ", error);
        this.showError = true;
        this.errorText = error.message;
        this.password = null;
        this.email = null;
      }
    },
    async handleLogout() {
      const supabase = useSupabaseClient();
      const booksStore = useBooksStore();

      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        this.loggedIn = false;
        booksStore.setUser(null);

        this.email = null;
        this.password = null;
        navigateTo("/admin");
      } catch (error) {
        console.error("ERROR Signing out ", error);
      }
    },
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
