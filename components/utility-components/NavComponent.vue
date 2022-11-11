<template>
  <nav class="nav">
    <div class="nav__left">
      <nuxt-link to="/" class="nav__link">Sandra Plumb</nuxt-link>
    </div>
    <div class="nav__control">
      <button @click="handleNavClick">
        <span class="nav__control--burger"></span>
        <span class="nav__control--burger"></span>
        <span class="nav__control--burger"></span>
      </button>
    </div>
    <div class="nav__right" :class="classes">
      <ul class="nav__list">
        <li class="nav__item">
          <nuxt-link to="/about" class="nav__link">About</nuxt-link>
        </li>
        <li class="nav__item">
          <nuxt-link to="/books" class="nav__link">Books</nuxt-link>
        </li>
        <li class="nav__item">
          <nuxt-link to="/contact" class="nav__link">Contact</nuxt-link>
        </li>
        <li class="nav__item">
          <nuxt-link to="/reviews" class="nav__link">Reviews</nuxt-link>
        </li>
        <li class="nav__item">
          <nuxt-link to="/downloads" class="nav__link">Downloads</nuxt-link>
        </li>
        <li class="nav__item">
          <nuxt-link to="/illustrations" class="nav__link"
            >Illustrations</nuxt-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import "./scss/nav.scss";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "NavComponent",
  setup() {
    const navShowing = ref(false);
    const classes = ref("");
    const width = ref(
      process.client ? document.documentElement.clientWidth : ""
    );

    onMounted(() => {
      window.addEventListener("resize", getDimensions);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", getDimensions);
    });

    function getDimensions() {
      if (!process.client) return;

      width.value = document.documentElement.clientWidth;

      if (width.value > 767) {
        navShowing.value = true;
        classes.value = "";
      }

      if (width.value < 768) {
        navShowing.value = false;
        classes.value = "not-showing";
      }
    }
    function handleNavClick() {
      navShowing.value = !navShowing.value;
      classes.value = navShowing.value ? "showing" : "not-showing";
    }

    return { handleNavClick, classes };
  },
};
</script>
