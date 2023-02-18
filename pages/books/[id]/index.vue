<template>
  <div class="single__book-page">
    <Transition>
      <div>
        <Book :bookId="$route.params.id" />
      </div>
    </Transition>
  </div>
</template>

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
