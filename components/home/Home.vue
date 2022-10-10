<template>
  <div class="home">
    <NavComponent />
    <div class="home__hero">
      <h1>Sandra Plum</h1>
      <div class="home__image-wrap" v-if="booksStore.books">
        <div
          v-for="book in booksStore.books"
          :key="book.id"
          class="home__image-container"
        >
          <img :src="book.image" :alt="book.title" class="home__image-image" />
        </div>
      </div>
    </div>
    <section class="home__main">
      <div class="container">
        <section class="about">
          <div class="row justify-content-center align-items-center">
            <div class="col-12 col-md-4">
              <img
                class="about__image"
                src="https://images.unsplash.com/photo-1523311964370-42ac336c878b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFtYnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="sandra plum profile"
              />
            </div>
            <div class="col-12 col-md-6">
              <h2>About</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                accumsan porttitor venenatis. Duis eu pellentesque ex, eu
                vulputate metus. Pellentesque ullamcorper purus erat, sed tempor
                massa elementum et. Nulla facilisi. Phasellus posuere fermentum
                lorem vel aliquam. Suspendisse id lacus lectus. Phasellus vel
                quam maximus, accumsan purus id, gravida felis. Proin convallis
                nibh id erat consectetur, non imperdiet augue gravida. Quisque
                vestibulum eleifend finibus. Etiam mauris neque, faucibus
                euismod hendrerit ut, fringilla ut elit. Vestibulum nec
                pellentesque nulla. Vestibulum accumsan libero sed mi placerat
                egestas.
              </p>
            </div>
          </div>
        </section>
        <section class="authored">
          <h2>Books I've Written</h2>
          <div class="row justify-content-center" v-if="booksStore.books">
            <div
              v-for="book in booksStore.books"
              :key="book.id"
              class="authored__books col-12 col-md-5"
            >
              <nuxt-link :to="`/books/${book.id}`" class="authored__books-wrap">
                <img
                  :src="book.image"
                  :alt="book.title"
                  class="authored__books-image"
                />
                <article class="authored__desc">
                  <p>{{ book.desc }}</p>
                </article>
              </nuxt-link>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="contact">
      <div class="container">
        <h2>Get In Touch</h2>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-md-6 col-lg-5">
            <form>
              <input type="text" class="form-control" />
              <input type="text" class="form-control" />
              <input type="text" class="form-control" />
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBooksStore } from "@/store/BooksStore";
//todo add this to vuex
const supabase = useSupabaseClient();
const booksStore = useBooksStore();

booksStore.getBooksFromServ(supabase);
console.log(booksStore.books);
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
