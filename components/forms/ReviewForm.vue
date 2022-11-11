<template>
  <div>
    <div class="container">
      <div class="text-center">
        <p>Below are some reviews</p>
        <p class="review__trigger" @click="leaveReview = true">
          Click here if you'd like to leave a review
        </p>
      </div>
    </div>
    <div class="reviewModal" v-if="leaveReview">
      <div
        class="review-modal__container"
        :class="leaveReview ? 'show' : 'hide'"
      >
        <div v-if="submitError">
          <p class="error">
            There was an error, please refresh the page and try again, if the
            problem persists please email plumbbooks789@gmail.com
          </p>
        </div>
        <div v-if="submitSuccess">
          <h3 class="text-center">Thanks</h3>
          <p>
            Your review has been submitted and it will be available here once
            the review has been approved
          </p>
        </div>
        <form @submit.prevent="handleSubmit" v-if="!submitSuccess">
          <div class="row">
            <div class="col-12 mb-2">
              <div class="form-group">
                <label for="bookTitle" class="form-label">Book Title</label>
                <input
                  class="form-control"
                  name="bookTitle"
                  id="bookTitle"
                  v-model="review.bookTitle"
                  required
                />
              </div>
            </div>
            <div class="col-12 mb-2">
              <div class="form-group">
                <label for="displayName" class="form-label"
                  >Display Name
                  <small
                    >(This will be the name that is shown against the
                    review)</small
                  ></label
                >
                <input
                  class="form-control"
                  name="displayName"
                  id="displayName"
                  v-model="review.dispName"
                  required
                />
              </div>
            </div>
            <div class="col-12 mb-2">
              <div class="form-group">
                <label for="reviewTitle" class="form-label">Review Title</label>
                <input
                  class="form-control"
                  name="reviewTitle"
                  id="reviewTitle"
                  v-model="review.reviewTitle"
                  required
                />
              </div>
            </div>
            <div class="col-12 mb-2">
              <div class="form-group">
                <label class="form-label" for="comment">Your Review:</label>
                <textarea
                  name="comment"
                  class="form-control"
                  id="message"
                  cols="30"
                  rows="5"
                  v-model="review.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="review-modal__buttons">
            <button @click="leaveReview = false" class="btn btn--beige">
              Cancel
            </button>
            <button type="submit" class="btn btn--orange">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="container" v-if="booksStore.approvedReviews">
      <ReviewList :reviews="booksStore.approvedReviews" />
    </div>
  </div>
</template>

<script>
import ReviewList from "@/components/review-list/ReviewList";
import { watchEffect, ref } from "vue";
import { useBooksStore } from "@/store/BooksStore";

export default {
  name: "ReviewForm",
  components: {
    ReviewList,
  },
  setup() {
    const booksStore = useBooksStore();
    const leaveReview = ref(false);

    const review = ref({
      dispName: null,
      comment: null,
      bookTitle: null,
      reviewTitle: null,
    });

    const submitSuccess = ref(false);
    const submitError = ref(false);
    const reviews = ref(undefined);

    async function handleSubmit() {
      submitError.value = false;

      const supabase = useSupabaseClient();

      try {
        const resp = await supabase.from("reviews").insert({
          review: review.value.comment,
          reviewerName: review.value.dispName,
          bookTitle: review.value.bookTitle,
          reviewTitle: review.value.reviewTitle,
        });

        if (resp.error) throw resp.error;

        review.value.dispName = null;
        review.value.comment = null;
        review.value.bookTitle = null;
        review.value.reviewTitle = null;

        submitSuccess.value = true;

        setTimeout(() => {
          submitSuccess.value = false;
          leaveReview.value = false;
        }, 5000);
      } catch (error) {
        console.error("ERROR SUBMITTING REVIEW ", error);
        submitError.value = true;
      }
    }

    return {
      leaveReview,
      review,
      submitSuccess,
      submitError,
      reviews,
      handleSubmit,
      booksStore,
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
  z-index: 5;
  backdrop-filter: blur(10px);
}

.review-modal__container {
  padding: 2rem 3rem;
  background: #fff;
  border-radius: 0.8rem;
  text-align: left;

  &.hide {
    opacity: 0;
    transform: translateX(-100vw);
    animation: slideOutBlock 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  &.show {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 5;
    animation: slideInBlock 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
}

.review-modal__buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@keyframes slideInBlock {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutBlock {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>
