<template>
  <footer class="footer">
    <div class="footer__left">
      <ul class="footer__list">
        <li class="footer__list--item">
          <nuxt-link to="" class="footer__link">Home</nuxt-link>
        </li>
        <li class="footer__list--item">
          <nuxt-link to="" class="footer__link">About</nuxt-link>
        </li>
        <li class="footer__list--item">
          <nuxt-link to="" class="footer__link">Books</nuxt-link>
        </li>
        <li class="footer__list--item">
          <nuxt-link to="" class="footer__link">Reviews</nuxt-link>
        </li>
        <li class="footer__list--item">
          <nuxt-link to="" class="footer__link">Downloads</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; Sandra Plumb {{ year }}</p>
    </div>
  </footer>
</template>

<script>
import "./scss/footer.scss";

export default {
  name: "FooterComponent",
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>
