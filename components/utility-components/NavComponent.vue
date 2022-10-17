<template>
  <nav class="nav">
    <div class="nav__left">
      <nuxt-link to="/" class="nav__link">Sandra Plumb</nuxt-link>
    </div>
    <div class="nav__right">
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
      </ul>
    </div>
  </nav>
</template>

<script>
import "./scss/nav.scss";

export default {
  name: "NavComponent",
};
</script>
