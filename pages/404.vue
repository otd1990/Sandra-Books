<template>
  <div class="error">
    <div class="container text-center">
      <div class="error__img">
        <img src="~/assets/images/tangled-sheep.png" alt="Tangled Sheep" />
      </div>
      <h1>{{ errorHeading }}</h1>
      <p>
        I can't find the page you've requested. Click
        <nuxt-link to="/">HERE</nuxt-link> to go to the homepage or
        <nuxt-link class="error__back" @click="$router.back()">HERE</nuxt-link>
        to go the previous page.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  computed: {
    errorHeading() {
      const possibleHeaders = [
        "Oh No!",
        "How Did You Get Here?",
        "There's Nothing To See Here",
        "Sorry",
        "Page Not Found",
        "Whoops!",
        "What's Happened Now?",
      ];

      const min = Math.ceil(0);
      const max = Math.floor(possibleHeaders.length);

      const num = Math.floor(Math.random() * (max - min + 1)) + min;

      console.log("NUM ", num);
      console.log(possibleHeaders[num]);

      return possibleHeaders[num];
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  &__img {
    max-height: 350px;
    max-width: 350px;
    margin: 1rem auto;

    img {
      height: 100%;
      width: 100%;
      display: block;
    }
  }

  &__back {
    color: #0d6efd;
    text-decoration: underline;
  }
}
</style>
