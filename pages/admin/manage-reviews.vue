<template>
  <div class="manage-reviews-page">
    <h1 class="text-center">Admin Review Approval</h1>
    <p class="text-center">
      All the reviews are below, you can approve or reject them here.<br />
      Rejected reviews will be deleted and approved reviews will appear on the
      site on the <nuxt-link to="/reviews">reviews page</nuxt-link>
    </p>

    <ReviewList
      :reviews="reviews"
      :showAdminControls="showAdmin"
      @modalClosed="handleModalClosed"
    />
  </div>
</template>

<script>
import ReviewList from "@/components/review-list/ReviewList.vue";
import { useBooksStore } from "@/store/BooksStore";

export default {
  components: { ReviewList },
  setup() {
    const booksStore = useBooksStore();
    const reviews = ref(booksStore.reviews);
    const showAdmin = true;

    async function handleModalClosed() {
      await booksStore.getAllReviews();
      reviews.value = booksStore.reviews;
    }

    return { reviews, showAdmin, handleModalClosed };
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
