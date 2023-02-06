<template>
  <NuxtLayout name="admin">
    <div v-if="!user" class="w-100">
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
      <NuxtPage />
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
    const user = useSupabaseUser();
    const booksStore = useBooksStore();

    const showError = ref(false);
    const errorText = ref("");

    async function handleLogout() {
      await useLogOut();
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

        user.value = true;
        booksStore.setUser(data.user);
        navigateTo("/admin/add-books");
      } catch (error) {
        console.error("Error Signing in ", error);
        showError.value = true;
        errorText.value = error.message;
      }
    }

    return {
      user,
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
