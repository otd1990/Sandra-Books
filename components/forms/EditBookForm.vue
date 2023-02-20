<template>
  <div class="edit-book-form mt-3">
    <form @submit.prevent="handleNewDataSubmit">
      <div class="row justify-content-center align-items-center">
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label class="form-label" for="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  required
                  v-model="uploadState.title"
                />
              </div>
            </div>

            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label class="form-label" for="desc">Description</label>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  class="form-control"
                  required
                  v-model="uploadState.desc"
                />
              </div>
            </div>

            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label class="form-label" for="extract">Extract</label>
                <textarea
                  type="text"
                  name="extract"
                  id="extract"
                  class="form-control"
                  required
                  plaintext
                  v-model="uploadState.extract"
                ></textarea>
              </div>
            </div>

            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label class="form-label" for="published">Published Date</label>
                <input
                  type="date"
                  name="published"
                  id="published"
                  class="form-control"
                  required
                  v-model="uploadState.publishedDate"
                />
              </div>
            </div>

            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label class="form-label" for="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  class="form-control"
                  required
                  v-model="uploadState.price"
                />
              </div>
            </div>

            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label for="image">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  class="form-control"
                  @change="uploadAvatar"
                />
              </div>
            </div>
            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label for="bannerImg">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  id="bannerImg"
                  class="form-control"
                  @change="uploadAvatar"
                />
              </div>
            </div>
            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <label for="quote">Quote</label>
                <input
                  type="text"
                  id="quote"
                  required
                  class="form-control"
                  name="quote"
                  v-model="uploadState.quote"
                />
              </div>
            </div>

            <div class="col-12 col-md-6 mb-2">
              <div class="form-group">
                <input
                  type="checkbox"
                  id="showOnHome"
                  name="showOnHome"
                  v-model="uploadState.showOnHomePage"
                  class="mx-2"
                />
                <label for="showOnHome"
                  >Show Book On Home Page? (This will make the book visible on
                  the home page)</label
                >
              </div>
            </div>
            <button type="submit" class="btn btn--orange align-self-end">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useBooksStore } from "~~/store/BooksStore";
import { ref } from "vue";
export default {
  name: "EditBookForm",
  props: ["book"],
  defineEmits: ["formEditSuccess"],
  setup(props, { emit }) {
    const uploadState = ref({
      image: props.book.image,
      title: props.book.title,
      desc: props.book.desc,
      extract: props.book.extract,
      publishedDate: props.book.publishedDate,
      price: props.book.price,
      quote: props.book.quote,
      showOnHomePage: props.book.showOnHomePage,
      bannerImg: props.book.bannerImg,
    });

    const config = useRuntimeConfig();

    async function handleNewDataSubmit() {
      const supabase = useSupabaseClient();
      const bookStore = useBooksStore();

      try {
        const { data, error } = await supabase
          .from("books")
          .update(uploadState.value)
          .eq("id", props.book.id);

        if (error) throw error;

        emit("formEditSuccess");
        bookStore.getBooksFromServ();
      } catch (error) {
        console.error("Error submitting data ");
      }
    }

    async function uploadAvatar(evt) {
      const supabase = useSupabaseClient();
      const files = evt.target.files;
      const isBanner = evt.target.id === "bannerImg" ? true : false;
      const uploadURL = isBanner
        ? `${config.public.supabase.url}/storage/v1/object/public/bookpics/banners`
        : `${config.public.supabase.url}/storage/v1/object/public/bookpics`;

      try {
        if (!files || files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        const file = files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${file.name}`;
        const filePath = isBanner ? `banners/${fileName}` : `${fileName}`;

        let resp = await supabase.storage
          .from("bookpics")
          .upload(filePath, file);

        if (resp.error) throw error;
        if (isBanner) {
          uploadState.value.bannerImg = `${uploadURL}/${fileName}`;
        } else {
          uploadState.value.image = `${uploadURL}/${fileName}`;
        }
      } catch (error) {
        alert(error.message);
      }
    }

    return {
      uploadState,
      handleNewDataSubmit,
      uploadAvatar,
    };
  },
  // data() {
  //   return {
  //     uploadState: {
  //       image: this.book.image,
  //       title: this.book.title,
  //       desc: this.book.desc,
  //       extract: this.book.extract,
  //       publishedDate: this.book.publishedDate,
  //       price: this.book.price,
  //       quote: this.book.quote,
  //       showOnHomePage: this.book.showOnHomePage,
  //       bannerImg: this.book.bannerImg,
  //     },
  //   };
  // },
};
</script>

<style lang="scss" scoped></style>
