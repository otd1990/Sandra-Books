<template>
  <div class="manage-reviews-page">
    <h1 class="text-center">Admin Review Approval</h1>
    <p class="text-center">
      All the reviews are below, you can approve or reject them here.<br />
      Rejected reviews will be deleted and approved reviews will appear on the
      site on the <nuxt-link to="/reviews">reviews page</nuxt-link>
    </p>

    <ReviewList :reviews="reviews" :showAdminControls="showAdmin" />
  </div>
</template>

<script>
import ReviewList from "@/components/review-list/ReviewList.vue";
import { useBooksStore } from "@/store/BooksStore";

export default {
  components: { ReviewList },
  setup() {
    const booksStore = useBooksStore();
    const reviews = booksStore.reviews;
    const showAdmin = true;

    return { reviews, showAdmin };
  },
};
</script>

<style lang="scss" scoped>
.manage-reviews-page {
  margin: 1.2rem;
  h1 {
    font-size: 2.4rem;
  }
}
</style>
