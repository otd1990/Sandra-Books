<template>
  <div class="single__book-page">
    <Transition>
      <div>
        <Book :bookId="$route.params.id" />
      </div>
    </Transition>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
export default {
  data() {
    return {
      uuid: uuid.v1(),
    };
  },
  head() {
    return {
      title: "Sandra Plumb Books | Book",
      script: [
        {
          src: "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js",
        },
      ],
    };
  },
  async mounted() {
    try {
      const { error, data } = await useFetch(
        "https://api.sumup.com/v0.1/checkouts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer <TOKEN>",
          },
          data: {
            checkout_reference: this.uuid,
            amount: 10,
            currency: "GBP",
            pay_to_email: "sandrajplumb@gmail.com",
          },
        }
      );

      if (error.value) throw error.value;

      console.log("CHECKOUT RESP ", data);
    } catch (error) {
      console.log("ERROR CREATEING CHECKOUT ", error.message);
    }
  },
};
</script>

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
