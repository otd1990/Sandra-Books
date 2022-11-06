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

export default {
  name: "NavComponent",
  data() {
    return {
      navShowing: false,
      classes: "",
      width: process.client ? document.documentElement.clientWidth : "",
    };
  },
  mounted() {
    window.addEventListener("resize", this.getWidth);
  },
  unmounted() {
    window.removeEventListener("resize", this.getWidth);
  },
  methods: {
    getDimensions() {
      if (!process.client) return;

      this.width = document.documentElement.clientWidth;

      if (this.width > 767) {
        this.navShowing = true;
        this.classes = "";
      }

      if (this.width < 768) {
        this.navShowing = false;
        this.classes = "not-showing";
      }
    },
    handleNavClick() {
      this.navShowing = !this.navShowing;
      this.classes = this.navShowing ? "showing" : "not-showing";
    },
  },
};
</script>
