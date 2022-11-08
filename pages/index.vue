<template>
  <NuxtLayout name="homepage">
    <Home />
  </NuxtLayout>
</template>

<script>
import Home from "../components/home/Home";

definePageMeta({
  layout: false,
});

export default {
  name: "IndexPage",
  layout: "homepage",
  component: {
    Home,
  },
  head() {
    return {
      title: "Sandra Plumb Books | Home",
    };
  },
};
</script>
