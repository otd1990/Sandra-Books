<template>
  <form class="flex row flex-center" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Nuxt 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />

        <input
          class="inputField"
          type="password"
          placeholder="password"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="block button"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup>
const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const resp = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    console.log("DATA ", resp);

    if (resp.error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>
