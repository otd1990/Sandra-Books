<template>
  <main class="homepage">
    <div class="default__layout">
      <NavComponent />
      <div class="slot--container">
        <slot />
      </div>
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
