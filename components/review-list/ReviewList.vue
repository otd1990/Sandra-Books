<template>
  <div class="reviews-list">
    <div v-if="reviews">reviews here</div>
    <div v-else>
      <hr />
      No reviews to display
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewList",
  props: ["reviews"],
};
</script>

<style lang="scss" scoped></style>
