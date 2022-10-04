<template>
  <div class="books">
    <div v-if="data">
      <div v-for="book in data" :key="book.id">
        <img :src="book.image" :alt="book.title" />
        <div>{{ book.title }}</div>
        <div>{{ book.desc }}</div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
let { data } = await supabase.from("books").select(`*`);
</script>
