<template>
  <NuxtLayout name="admin">
    <div v-if="!loggedIn" class="w-100">
      <AdminForm
        @onFormSubmit="handleSubmit"
        :showError="showError"
        :errorText="errorText"
      />
    </div>
    <div v-else class="admin__diff">
      <div class="container mt-5">
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
      <NuxtChild />
    </div>
  </NuxtLayout>
</template>

<script>
import AdminForm from "@/components/forms/AdminForm";
import { useBooksStore } from "@/store/BooksStore";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: false,
  middleware: ["auth"],
});

export default {
  name: "AdminPage",
  layout: "admin",
  components: {
    AdminForm,
  },
  setup() {
    const loggedIn = ref(false);
    const booksStore = useBooksStore();

    const showError = ref(false);
    const errorText = ref("");

    if (process.client) {
      const fromStoreage = localStorage.getItem("supabase.auth.token");
      loggedIn.value = fromStoreage ? true : false;
    }

    async function handleLogout() {
      const supabase = useSupabaseClient();

      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        loggedIn.value = false;
        booksStore.setUser(null);

        navigateTo("/admin");
      } catch (error) {
        console.error("ERROR Signing out ", error);
      }
    }

    async function handleSubmit(email, password) {
      const supabase = useSupabaseClient();
      showError.value = false;
      errorText.value = "";

      try {
        const { data, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });

        if (error) throw error;

        loggedIn.value = true;
        booksStore.setUser(data.user);
        navigateTo("/admin/add-books");
      } catch (error) {
        console.error("Error Signing in ", error);
        showError.value = true;
        errorText.value = error.message;
      }
    }

    return {
      loggedIn,
      showError,
      errorText,
      handleSubmit,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.position-abso-center {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
