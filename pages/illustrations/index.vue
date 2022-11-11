<template>
  <div class="container text-center page-top-padding">
    <h1 class="my-2">Images</h1>
    <section class="grid">
      <div
        class="grid__container skeletor"
        :class="loading ? 'loading' : 'loaded'"
      >
        <Skeletor v-for="i in 12" :key="i" height="200" width="200" />
      </div>
      <div class="grid__container" v-if="!loading">
        <figure v-for="(illustration, index) in illustrations" :key="index">
          <img
            :src="`https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/illustrations/${illustration.name}`"
            :alt="illustration.name"
          />
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import { useBooksStore } from "@/store/BooksStore";
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

export default {
  async setup() {
    const bookStore = useBooksStore();
    const loading = ref(true);

    const illustrations = bookStore.illustrations
      ? bookStore.illustrations
      : await bookStore.getIllustrations();

    loading.value = false;

    return { loading, illustrations };
  },
  components: {
    Skeletor,
  },
  head() {
    return {
      title: "Sandra Plumb Books | Illustrations",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";

.container {
  margin: 0 auto;
}
.grid {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  &__container {
    max-width: 1024px;
    display: grid;
    grid-template-columns: 100%;
    @media (min-width: $mobile-lg) {
      grid-template-columns: 50% 50%;
    }
    @media (min-width: $tablet) {
      grid-template-columns: 33.333% 33.333% 33.333%;
    }

    figure {
      margin: 5px;
      padding: 5px;
    }

    img {
      display: block;
      max-width: 100%;
      height: 100%;
    }
  }

  .skeletor {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $beigeMain;
    &.loaded {
      animation: fadeOut 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    span {
      margin: 5px;
      padding: 5px;
      display: block;
      height: 95% !important;
      width: 95% !important;
    }
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
    z-index: -1;
  }
}
</style>
