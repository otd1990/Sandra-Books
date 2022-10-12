<template>
  <div class="single__book-page">
    <Book :bookId="bookId" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.$route.params.id,
    };
  },
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
</style>
