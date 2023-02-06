<template>
  <div class="container text-center page-top-padding">
    <h1 class="my-2">Illustrations</h1>
    <p>
      Illustrations by
      <a href="mailto: alicia@allaboutartwork.co.uk">Alicia Howard</a>
    </p>
    <div class="illustrations row">
      <div class="col-12 col-md-6">
        <section class="cow-section">
          <h3>Freda</h3>
          <section class="excerpt">
            <p>
              Freda is head of the dairy cow herd,<br />
              Her milk makes yogurt, cheese, butter and curd.<br />
              Freda grazes on grass which she loves to eat<br />
              Being milked twice a day to a classical beat.
            </p>
          </section>
          <figure>
            <img
              src="https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/illustrations/PW17.png"
              alt="Cows looking over the fence"
            />
            <figcaption>
              <span class="fw-bold">Animal Fact: </span>Just like you, cows have
              favourite friends who make them happy.
            </figcaption>
          </figure>
        </section>
      </div>
      <div class="col-12 col-md-6">
        <section class="chicken-section">
          <h3>The Colonel</h3>
          <div class="excerpt">
            <p>
              The Colonel is like a military guard,<br />
              Out of bed he struts around the yard.<br />
              Checking for danger and looking for food,<br />
              Crowing,”Good Morning” to wake up his brood.
            </p>
          </div>
          <figure>
            <img
              src="https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/illustrations/chicken.png"
              alt="Rooster Pointing"
            />
            <figcaption>
              <span class="fw-bold">Animal Fact: </span>The job of a rooster or
              cockerel is to protect his flock.
            </figcaption>
          </figure>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Sandra Plumb Books | Illustrations",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";

.container {
  margin: 0 auto;
}
.grid {
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  &__container {
    max-width: 1024px;
    display: grid;
    grid-template-columns: 100%;
    grid-column-gap: 0.5rem;
    grid-gap: 0.5rem;
    padding: 1rem;
    img {
      display: block;
      width: 350px;
      height: 300px;
      margin: 0 auto;
      @media (max-width: 992px) {
        width: 300px;
        height: 240px;
      }
      @media (max-width: 480px) {
        width: 250px;
        height: 200px;
      }
    }

    figcaption {
      margin: 1rem 0;
    }
  }

  .skeletor {
    &.loaded {
      animation: fadeOut 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    span {
      margin: 5px;
      padding: 5px;
      display: block;
    }
  }
}

.illustrations {
  padding: 1rem 1rem;

  h3 {
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
    @media (max-width: 575px) {
      font-size: 2rem;
    }
  }
  .excerpt {
    margin: 1rem 0;
    font-style: italic;
  }

  p,
  figcaption {
    @media (max-width: 992px) {
      font-size: 0.9rem;
    }
    @media (max-width: 575px) {
      font-size: 0.855rem;
    }
  }

  img {
    display: block;
    width: 350px;
    height: 300px;
    margin: 0 auto;
    @media (max-width: 992px) {
      width: 300px;
      height: 240px;
    }
    @media (max-width: 480px) {
      height: 250px;
      width: 250px;
    }
  }

  figcaption {
    margin: 1rem 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
    z-index: -1;
  }
}
</style>
