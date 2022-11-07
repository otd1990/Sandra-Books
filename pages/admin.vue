<template>
  <NuxtLayout name="admin">
    <div class="w-100">
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
  middleware: ["auth"],
});

export default {
  name: "AdminPage",
  layout: "admin",
  components: {
    AdminForm,
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
