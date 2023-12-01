<template>
  <div class="manage-reviews-page">
    <h1 class="text-center">Admin Review Approval</h1>
    <p class="text-center">
      All the reviews are below, you can approve or reject them here.<br />
      Rejected reviews will be deleted and approved reviews will appear on the
      site on the <nuxt-link to="/reviews">reviews page</nuxt-link>
    </p>

    <ReviewList
      v-if="reviews !== undefined && reviews.length > 0"
      :reviews="reviews"
      :showAdminControls="showAdmin"
      @modalClosed="handleModalClosed"
    />
  </div>
</template>

<script>
import { onMounted } from "vue";
import ReviewList from "@/components/review-list/ReviewList.vue";
import { useBooksStore } from "@/store/BooksStore";
import { storeToRefs } from "pinia";

export default {
  components: { ReviewList },
  setup() {
    const booksStore = useBooksStore();
    const { reviews } = storeToRefs(booksStore);
    const showAdmin = true;

    onMounted(async () => {
      try {
        if (!booksStore.reviews) {
          await booksStore.getAllReviews();
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    });

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
