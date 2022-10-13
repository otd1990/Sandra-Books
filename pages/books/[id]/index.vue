<template>
  <div class="single__book-page">
    <Transition>
      <div>
        <Book :bookId="bookId" />
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.$route.params.id,
      show: false,
    };
  },
  transition: "home",
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables.scss";

.single__book-page,
.default__layout {
  flex: 1;
  background: $beigeMain;
}

.single__book-page {
  display: flex;
  align-items: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
