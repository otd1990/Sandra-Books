<template>
  <div class="error">
    <div class="container text-center">
      <div class="error__img">
        <img src="~/assets/images/tangled-sheep.png" alt="Tangled Sheep" />
      </div>
      <h1>Whoops!</h1>
      <p>
        I can't find the page you've requested. Click
        <nuxt-link to="/">HERE</nuxt-link> to go to the homepage or
        <nuxt-link class="error__back" :to="$router.options.history.state.back"
          >HERE</nuxt-link
        >
        to go the previous page.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  head() {
    return {
      title: "Sandra Plumb Books | 404",
    };
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
