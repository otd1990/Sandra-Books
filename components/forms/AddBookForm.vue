<template>
  <div class="add-book-form">
    <form @submit.prevent="handleNewDataSubmit">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-sm-10 col-md-6">
          <div class="row">
            <div class="col-12 mb-2">
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

            <div class="col-12 mb-2">
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

            <div class="col-12 mb-2">
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

            <div class="col-12 mb-2">
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

            <div class="col-12 mb-2">
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

            <div class="col-12 mb-2">
              <div class="form-group">
                <label for="image">Book Image</label>
                <p>Should be smaller than the <b>Banner Image</b></p>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  required
                  class="form-control"
                  @change="uploadAvatar"
                />
              </div>
            </div>

            <div class="col-12 mb-2">
              <div class="form-group">
                <label for="bannerImg">Banner Image</label>
                <p>
                  Shown on slider on the homepage, this should be a larger image
                  than the <b>Book Image</b>
                </p>
                <input
                  type="file"
                  accept="image/*"
                  id="bannerImg"
                  required
                  class="form-control"
                  @change="uploadAvatar"
                />
              </div>
            </div>

            <div class="col-12 mb-2">
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

            <div class="col-12 mb-2">
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
import { ref } from "vue";

export default {
  name: "AddBookForm",
  setup() {
    const uploadState = ref({
      image: "",
      title: "",
      desc: "",
      extract: "",
      publishedDate: "",
      price: 0,
      quote: "",
      showOnHomePage: true,
      bannerImg: "",
    });
    async function handleNewDataSubmit() {
      const supabase = useSupabaseClient();

      try {
        const { data, error } = await supabase
          .from("books")
          .insert(this.uploadState);

        if (error) throw error;
        alert("this book was uploaded successfully");
        uploadState.value = {
          image: "",
          title: "",
          desc: "",
          extract: "",
          publishedDate: "",
          price: 0,
          quote: "",
          showOnHomePage: false,
          bannerImg: "",
        };
      } catch (error) {
        console.error("Error submitting data ", error);
      }
    }
    async function uploadAvatar(evt) {
      const supabase = useSupabaseClient();
      const files = evt.target.files;
      const isBanner = evt.target.id === "bannerImg" ? true : false;
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
      uploadAvatar,
      handleNewDataSubmit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
