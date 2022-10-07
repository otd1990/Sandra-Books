<template>
  <div class="home">
    <NavComponent />
    <div class="home__hero">
      <h1>Sandra Plum</h1>
      <div class="home__image-wrap" v-if="data">
        <div v-for="book in data" :key="book.id" class="home__image-container">
          <img :src="book.image" :alt="book.title" class="home__image-image" />
        </div>
      </div>
    </div>
    <section class="home__main">
      <h1>About</h1>
    </section>
  </div>
</template>

<script setup>
//todo add this to vuex
const supabase = useSupabaseClient();
let { data } = await supabase.from("books").select(`*`);
</script>

<script>
import "./home.scss";
import NavComponent from "@/components/utility-components/NavComponent.vue";

export default {
  name: "Home",
  components: {
    NavComponent,
  },
};
</script>
