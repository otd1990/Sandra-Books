<template>
  <div class="text-center page-top-padding">
    <h1 class="my-2">Reviews</h1>
    <ReviewForm />
  </div>
</template>

<script setup>
// import { onMounted } from "vue";
// import { useBooksStore } from "@/store/BooksStore";

// const booksStore = useBooksStore();

// onMounted(() => {
//   if (!booksStore.approvedReviews) {
//     booksStore.getApprovedReviews();
//   }
// });
</script>

<script>
import ReviewForm from "@/components/forms/ReviewForm";

export default {
  components: {
    ReviewForm,
  },
  head() {
    return {
      title: "Sandra Plumb Books | Reviews",
    };
  },
};
</script>

<style lang="scss" scoped>
.review__trigger {
  cursor: pointer;
}

.reviewModal {
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.review-modal__container {
  padding: 2rem 3rem;
  background: #fff;
  border-radius: 0.8rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.review-modal__buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
