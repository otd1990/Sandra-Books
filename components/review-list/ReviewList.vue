<template>
  <div class="container">
    <div class="review-list">
      <div v-if="reviews">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="review-list__wrapper"
        >
          <div class="review-list__review-container">
            <div class="review-list__header">
              <h4 class="review-list__title">{{ review.reviewTitle }}</h4>
              <div class="review-list__admin-controls" v-if="showAdminControls">
                <div
                  class="admin-controls__reject"
                  @click="() => rejectReview(review.id)"
                >
                  &cross;
                </div>
                <div
                  class="admin-controls__accept"
                  @click="() => approveReview(review.id)"
                >
                  &check;
                </div>
              </div>
            </div>
            <h6 class="review-list__book-title">
              Book: <span>{{ review.bookTitle }}</span>
            </h6>
            <p class="review-list__review">{{ review.review }}</p>
            <div class="review-list__dets">
              <p class="review-list__by">Review By {{ review.reviewerName }}</p>
              <p class="review-list__date">
                {{ new Date(review.created_at).toLocaleDateString("en-GB") }}
              </p>
            </div>
            <div v-if="showAdminControls">
              <p class="my-5">
                REVIEW STATUS:
                <b>{{ review.approved ? "APPROVED" : "NOT APPROVED" }}</b>
              </p>
              <p v-if="approved" class="review-status">
                Review has been <b>APPROVED</b> and will show on the site
              </p>
              <p v-if="rejected" class="review-status">
                Review has been <b>REJECTED</b> and will not show on the site
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <hr />
        No reviews to display
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ReviewList",
  props: ["reviews", "showAdminControls"],
  setup() {
    const approved = ref(false);
    const rejected = ref(false);

    async function approveReview(id) {
      const supabase = useSupabaseClient();

      try {
        const resp = await supabase
          .from("reviews")
          .update({ approved: true })
          .eq("id", id);

        if (resp.error) throw resp.error;

        approved.value = true;
        rejected.value = false;
      } catch (error) {
        console.error("ERROR APPROVING ", error);
        alert(error.message);
      }
    }

    async function rejectReview(id) {
      const supabase = useSupabaseClient();

      try {
        const resp = await supabase
          .from("reviews")
          .update({ approved: false })
          .eq("id", id);

        if (resp.error) throw resp.error;

        rejected.value = true;
        approved.value = false;
      } catch (error) {
        console.error("ERROR REJECTING ", error);
        alert(error.message);
      }
    }

    return { approved, rejected, approveReview, rejectReview };
  },
  methods: {
    async rejectReview(id) {
      const supabase = useSupabaseClient();

      try {
        const resp = await supabase
          .from("reviews")
          .update({ approved: false })
          .eq("id", id);

        if (resp.error) throw resp.error;

        this.rejected = true;
        this.approved = false;
      } catch (error) {
        console.error("ERROR REJECTING ", error);
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.review-list {
  padding: 2rem;
  @media (max-width: 375px) {
    padding: 2rem 0.25rem;
  }
  &__wrapper {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 0.5rem;
  }

  &__title {
    font-size: 2rem;
  }

  &__book-title {
    text-align: left;
    font-size: 1.2rem;
    span {
      font-weight: bold;
    }
  }

  &__review {
    margin: 1rem 0;
    font-style: italic;
    text-align: left;
  }

  &__dets {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__by {
    text-align: left;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__admin-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .admin-controls {
      &__reject,
      &__accept {
        height: 20px;
        width: 20px;
        color: #fff;
        margin: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 50%;
        font-weight: bold;
        cursor: pointer;
      }

      &__reject {
        background: red;
      }

      &__accept {
        background: green;
      }
    }
  }
}

.review-status {
  text-align: center;
  margin: 1rem;
}
</style>
