<template>
  <NuxtLayout name="admin">
    <div>
      <AdminForm />
    </div>
    <div class="admin__diff">
      <NuxtChild />
    </div>
  </NuxtLayout>
</template>

<script>
import AdminForm from "@/components/forms/AdminForm";

definePageMeta({
  layout: false,
});

export default {
  name: "AdminPage",
  layout: "admin",
  components: {
    AdminForm,
  },
};
</script>
