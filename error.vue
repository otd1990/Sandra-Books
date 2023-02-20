<template>
  <div class="error">
    <div class="container text-center">
      <div class="error__img">
        <img src="~/assets/images/tangled-sheep.png" alt="Tangled Sheep" />
      </div>
      <h1>Whoops!</h1>
      <p>Somethings gone wrong</p>
      <p>
        I can't find the page you've requested. Click
        <nuxt-link class="error__back" @click="goHome">HERE</nuxt-link>
        to go the home page.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: ["error"],
  setup(props) {
    const goHome = () => {
      clearError({ redirect: "/" });
    };

    return { goHome };
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/main.scss";
.error {
  height: 100vh;
  .container {
    margin: auto;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
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
