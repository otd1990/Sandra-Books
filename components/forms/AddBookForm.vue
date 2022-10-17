<template>
  <div class="add-book-form">
    <form @submit.prevent="handleNewDataSubmit">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-sm-10 col-md-6">
          <div class="row">
            <div class="col-12">
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

            <div class="col-12">
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

            <div class="col-12">
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

            <div class="col-12">
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

            <div class="col-12">
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

            <div class="col-12">
              <div class="form-group">
                <label for="image">Image</label>
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

            <div class="col-12">
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
export default {
  name: "AddBookForm",
  data() {
    return {
      uploadState: {
        image: "",
        title: "",
        desc: "",
        extract: "",
        publishedDate: "",
        price: 0,
        quote: "",
      },
    };
  },
  methods: {
    async handleNewDataSubmit() {
      const supabase = useSupabaseClient();

      try {
        const { data, error } = await supabase
          .from("books")
          .insert(this.uploadState);

        if (error) throw error;
      } catch (error) {
        console.error("Error submitting data ", error);
      }
    },
    async uploadAvatar(evt) {
      const supabase = useSupabaseClient();
      const files = evt.target.files;

      try {
        if (!files || files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        const file = files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${file.name}`;
        const filePath = `${fileName}`;

        let resp = await supabase.storage
          .from("bookpics")
          .upload(filePath, file);

        if (resp.error) throw error;

        this.uploadState.image = `https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/bookpics/${fileName}`;
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
