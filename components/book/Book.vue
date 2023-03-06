<template>
  query .... {{ query }} ///

  <section class="single-book">
    <div class="single-book__container">
      <div
        class="row justify-space-between align-items-center"
        v-if="singleBook"
      >
        <div class="single-book__quote">
          <p>
            “
            {{ singleBook.quote }}
            ”
          </p>
        </div>
        <div v-if="1 > 100" class="col-12 col-md-2">
          <div class="single-book__quote">
            <p>
              “<br />
              {{ singleBook.quote }}
              <br />
              ”
            </p>
          </div>
        </div>
        <div class="col-12">
          <section class="single-book__main">
            <div class="row align-items-center">
              <div class="col-12 col-lg-6 col-xl-3">
                <div class="single-book__image">
                  <img
                    :src="singleBook.image"
                    :alt="singleBook.title"
                    class="single-book--image h-100"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6 col-xl-9">
                <div class="single-book__info">
                  <h1 class="single-book__title">{{ singleBook.title }}</h1>
                  <p class="single-book__desc">{{ singleBook.desc }}</p>
                  <div class="info__wrapper">
                    <div class="info--title">
                      <h5>Published</h5>
                      <p>
                        {{
                          new Date(singleBook.publishedDate).toLocaleDateString(
                            "en-GB"
                          )
                        }}
                      </p>
                    </div>
                    <div class="info--title">
                      <h5>Price</h5>
                      <p>&pound;{{ singleBook.price }}</p>
                    </div>
                    <div class="col-12">
                      <div class="info--title">
                        <h5>Extract</h5>
                        <div
                          class="extract d-block w-100"
                          style="white-space: pre-wrap"
                        >
                          {{ singleBook.extract }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="flex-between">
            <nuxt-link @click="$router.back()" class="btn btn--black"
              >Back</nuxt-link
            >

            <div
              v-if="query === 'showthebuttonplease'"
              id="smart-button-container"
            >
              <div style="text-align: center">
                <div id="paypal-button-container"></div>
              </div>
            </div>
            <nuxt-link
              v-else
              :to="`/buy/book/${singleBook.id}`"
              class="btn btn-primary btn--orange"
              >Buy Book</nuxt-link
            >
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </section>
</template>

<script>
import { useBooksStore } from "@/store/BooksStore";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";

export default {
  name: "Book",
  props: ["bookId"],
  setup(props) {
    const booksStore = useBooksStore();
    const { books } = storeToRefs(booksStore);
    let singleBook = ref(null);
    const route = useRoute();
    const query = route.query.showpaybtn;

    //https://www.thisdot.co/blog/vue-3-composition-api-watch-and-watcheffect
    watchEffect(() => {
      if (books.value !== undefined) {
        singleBook = books.value.find((book) => {
          return book.id === parseInt(props.bookId);
        });
        booksStore.setSingleBook(singleBook);
      }
    });

    if (!singleBook) {
      throw createError({
        statusCode: 404,
        statusMessage: "I don't have a book that matches that ID.",
      });
    }

    console.log("ROOOOUTE ", route, " query ", query);

    function initPayPalButton() {}

    onMounted(() => {
      function loadScript(url, callback) {
        console.log("loading script  1");
        const el = document.querySelector(`script[src="${url}"]`);
        console.log("loading script  2");

        if (!el) {
          console.log("loading script 3");
          const s = document.createElement("script");
          s.setAttribute("src", url);
          console.log("loading script 4");

          s.onload = callback;
          console.log("loading script 5");

          document.head.insertBefore(s, document.head.firstElementChild);
          console.log("loading script 6");
        } else {
          console.log("not el");
        }
      }

      loadScript(
        "https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=GBP",
        () => {
          console.log("sdfdfsdfs");
          console.log("Init");
          paypal
            .Buttons({
              style: {
                shape: "rect",
                color: "gold",
                layout: "vertical",
                label: "paypal",
              },

              createOrder: function (data, actions) {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Children's Book",
                      amount: {
                        currency_code: "GBP",
                        value: 11.5,
                        breakdown: {
                          item_total: { currency_code: "GBP", value: 10 },
                          shipping: { currency_code: "GBP", value: 1.5 },
                          tax_total: { currency_code: "GBP", value: 0 },
                        },
                      },
                    },
                  ],
                });
              },

              onApprove: function (data, actions) {
                return actions.order.capture().then(function (orderData) {
                  // Full available details
                  console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                  );

                  // Show a success message within this page, e.g.
                  const element = document.getElementById(
                    "paypal-button-container"
                  );
                  element.innerHTML = "";
                  element.innerHTML = "<h3>Thank you for your payment!</h3>";

                  // Or go to another URL:  actions.redirect('thank_you.html');
                });
              },

              onError: function (err) {
                console.log(err);
              },
            })
            .render("#paypal-button-container");
        }
      );
    });

    return { books, singleBook, query };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.info__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.extract {
  font-size: 0.9rem;
}

.single-book {
  padding: 5.75rem 0 2.75rem 0;
  background-color: $beigeMain;

  h1 {
    font-size: 2rem;

    @media (min-width: $laptop) {
      font-size: 4rem;
    }
  }

  &__container {
    padding: 2rem 2rem;
    min-height: 675px;

    @media (min-width: 675px) {
      padding: 2rem 4.5rem;
    }
  }

  &__quote {
    text-align: center;
    font-size: 1.45rem;
    font-style: italic;
  }

  &__main {
    display: flex;
    background: #fff;
  }

  &__desc {
    text-align: center;
    font-size: 0.9rem;
    margin: 1.5rem 0 2rem 0;
  }

  &__info {
    width: 100%;
    padding: 2rem;
  }

  &__title {
    text-align: center;
  }

  .info--title {
    &:not(:last-child) {
      margin-right: 2rem;
    }
    h5 {
      font-size: 0.9rem;
      color: #5b6c6f;
      font-weight: bold;
      letter-spacing: 1.25px;
      /* color: #949896; */
      /* color: #224543; */
      /* color: #C9AE99;*/
    }
  }

  &__image {
    height: 100%;
    padding: 1rem;
  }

  &--image {
    max-width: 100%;
    object-fit: fill;
    width: 100%;
    max-height: 450px;
    display: block;
    margin: auto;

    @media (min-width: $mobile-lg) {
      width: 70%;
    }

    @media (min-width: 575px) {
      width: 50%;
    }

    @media (min-width: $laptop-sm) {
      width: 100%;
      max-height: 700px;
    }
  }
}

.heading__quote {
  margin: 2rem 0;
  font-style: italic;
  text-align: center;
}
</style>
