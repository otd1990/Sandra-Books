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
                <input
                  type="text"
                  name="extract"
                  id="extract"
                  class="form-control"
                  required
                  v-model="uploadState.extract"
                />
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
export default {
  name: "EditBookForm",
  props: ["book"],
  data() {
    return {
      uploadState: {
        image: this.book.image,
        title: this.book.title,
        desc: this.book.desc,
        extract: this.book.extract,
        publishedDate: this.book.publishedDate,
        price: this.book.price,
        quote: this.book.quote,
        showOnHomePage: this.book.showOnHomePage,
        bannerImg: this.book.bannerImg,
      },
    };
  },
  methods: {
    async handleNewDataSubmit() {
      const supabase = useSupabaseClient();
      const bookStore = useBooksStore();

      console.log(this.book);

      try {
        const { data, error } = await supabase
          .from("books")
          .update(this.uploadState)
          .eq("id", this.book.id);

        if (error) throw error;

        console.log(data);

        this.$emit("formEditSuccess");
        bookStore.getBooksFromServ();
      } catch (error) {
        console.error("Error submitting data ", error);
      }
    },
    async uploadAvatar(evt) {
      console.log(evt.target.id);
      const supabase = useSupabaseClient();
      const files = evt.target.files;
      const isBanner = evt.target.id === "bannerImg" ? true : false;
      console.log(isBanner);
      const uploadURL = isBanner
        ? "https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/bookpics/banners"
        : "https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/bookpics";

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
          this.uploadState.bannerImg = `${uploadURL}/${fileName}`;
        } else {
          this.uploadState.image = `${uploadURL}/${fileName}`;
        }

        console.log(this.uploadState);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
