<template>
  <main>
    <div class="default__layout">
      <NavComponent />
      <slot />
    </div>
    <FooterComponent />
  </main>
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
