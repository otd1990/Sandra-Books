<template>
  <div class="review-list">
    <div v-if="reviews" :class="showAdminControls ? 'container' : ''">
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
          </div>
        </div>
      </div>
      <div v-if="reviewModal" class="modal-container">
        <div class="modal-inner">
          <h4>Review {{ approved ? "Approved" : "Rejected" }}</h4>
          <p>Review has been {{ approved ? "Approved" : "Rejected" }}</p>
          <div class="modal__buttons">
            <button @click="handleClose" class="btn btn--orange">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <hr />
      No reviews to display
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ReviewList",
  props: ["reviews", "showAdminControls"],
  emits: ["modalClosed"],
  setup(_, ctx) {
    const approved = ref(false);
    const rejected = ref(false);
    const reviewModal = ref(false);

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
        reviewsFinisher();
      } catch (error) {
        console.error("ERROR APPROVING ");
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
        reviewsFinisher();
      } catch (error) {
        console.error("ERROR REJECTING ");
        alert(error.message);
      }
    }

    function handleClose() {
      reviewModal.value = false;
    }

    function reviewsFinisher() {
      ctx.emit("modalClosed");
      reviewModal.value = true;
    }

    return {
      approved,
      rejected,
      reviewModal,
      approveReview,
      rejectReview,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.review-list {
  padding: 1rem 0 2rem 0;
  @media (min-width: 375px) {
    padding: 2rem 0;
  }
  &__wrapper {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 0.5rem;
  }

  &__title {
    font-size: 1.75rem;
    text-align: left;
    @media (min-width: 500px) {
      font-size: 2rem;
    }
  }

  &__book-title {
    text-align: left;
    font-size: 1rem;
    margin: 0.5rem 0;
    span {
      font-weight: bold;
    }
  }

  &__review {
    margin: 1rem 0;
    font-style: italic;
    text-align: left;
    font-size: 0.9rem;
    @media (min-width: 500px) {
      font-size: 1.1rem;
    }
  }

  &__dets {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.8rem;
    @media (min-width: 500px) {
      font-size: 0.9rem;
    }
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

.modal-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-inner {
  background: white;
  border-radius: 8px;
  padding: 2rem 1rem;
  text-align: center;
  margin: 1rem 1.75rem;
  min-width: 22rem;
  h4 {
    font-size: 2.5rem;
  }
}
</style>
