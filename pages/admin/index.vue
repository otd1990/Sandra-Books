<template>
  <div>
    <AdminForm />
  </div>
</template>

<script setup>
const layout = "custom";
</script>

<script>
import AdminForm from "@/components/forms/AdminForm";
export default {
  name: "AdminPage",
  layout: "admin",
  components: {
    AdminForm,
  },
};
</script>
