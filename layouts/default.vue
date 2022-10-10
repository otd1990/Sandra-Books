<template>
  <NavComponent class="mb-2" />
  <slot />
  <FooterComponent />
</template>

<script>
import NavComponent from "@/components/utility-components/NavComponent";
import FooterComponent from "@/components/utility-components/FooterComponent";

export default {
  components: {
    NavComponent,
    FooterComponent,
  },
};
</script>

<style></style>
