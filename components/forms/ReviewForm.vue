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
      <div class="review-modal__container">
        <div v-if="submitError">
          <p class="error">
            There was an error, please refresh the page and try again, if the
            problem persists please email plumbbooks789@gmail.com
          </p>
        </div>
        <div v-if="submitSuccess">
          <h3>Thanks</h3>
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
    <div class="container">
      <ReviewList :reviews="reviews" />
    </div>
  </div>
</template>

<script>
import ReviewList from "@/components/review-list/ReviewList";
import { useBooksStore } from "@/store/BooksStore";

export default {
  name: "ReviewForm",
  components: {
    ReviewList,
  },
  async setup() {
    const bookStore = useBooksStore();
    const reviews = bookStore.approvedReviews;

    console.log("REVIEWS ", reviews);

    return { reviews };
  },
  data() {
    return {
      leaveReview: false,
      review: {
        dispName: null,
        comment: null,
        bookTitle: null,
      },
      submitSuccess: false,
      submitError: false,
      reviews: undefined,
    };
  },
  methods: {
    async handleSubmit() {
      this.submitError = false;

      const supabase = useSupabaseClient();

      try {
        const resp = await supabase.from("reviews").insert({
          review: this.review.comment,
          reviewerName: this.review.dispName,
          bookTitle: this.review.bookTitle,
        });

        console.log("REVIEW SUBMIT ", resp);

        if (resp.error) throw resp.error;

        this.review = {
          dispName: null,
          comment: null,
        };

        this.submitSuccess = true;

        setTimeout(() => {
          this.submitSuccess = false;
          this.leaveReview = false;
        }, 5000);
      } catch (error) {
        console.error("ERROR SUBMITTING REVIEW ", error);
        this.submitError = true;
      }
    },
  },
};
</script>
