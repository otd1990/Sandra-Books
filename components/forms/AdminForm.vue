<template>
  <div class="container mt-5">
    <form @submit.prevent="onSubmit" v-if="!loggedIn">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-sm-10 col-md-6">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="email">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  id="email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="password">password:</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  v-model="password"
                />
              </div>
            </div>
          </div>
          <div class="form--btn">
            <button class="btn btn-primary btn--orange">Submit</button>
          </div>
        </div>
      </div>
    </form>
    <div v-else>
      <button @click="handleLogout" class="btn btn--orange">Log Out</button>

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
                  <label class="form-label" for="published"
                    >Published Date</label
                  >
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

    <!-- <Auth /> -->
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useBooksStore } from "@/store/BooksStore";
import { storeToRefs } from "pinia";

// import Auth from "@/components/Auth";

//https://www.freecodecamp.org/news/add-supabase-authentication-to-vue/

// https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/sign/bookpics/layered-waves-haikei.svg
// https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/bookpics/layered-waves-haikei.svg

export default {
  name: "AdminForm",
  data() {
    return {
      email: null,
      password: null,
      loggedIn: false,

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
  created() {
    console.log("checking lStore ", process);

    if (process.client) {
      console.log("IS BROSERS");
      const fromStoreage = localStorage.getItem("supabase.auth.token");
      console.log("FORM STOREAGE ", fromStoreage);

      this.loggedIn = fromStoreage ? true : false;
    }
  },
  methods: {
    async handleNewDataSubmit() {
      console.log("HANDLE NEW SUBMIT");
      const supabase = useSupabaseClient();

      try {
        const { data, error } = await supabase
          .from("books")
          .insert(this.uploadState);

        console.log("DATA ", data);

        if (error) throw error;
      } catch (error) {
        console.error("Error submitting data ", error);
      }
    },
    async uploadAvatar(evt) {
      const supabase = useSupabaseClient();

      console.log(evt.target.files);

      const files = evt.target.files;

      console.log("FILES ", files);

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

        console.log(this.uploadState);
      } catch (error) {
        alert(error.message);
      }
    },
    async onSubmit() {
      const supabase = useSupabaseClient();
      const booksStore = useBooksStore();

      try {
        const { data, error } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        console.log("DATA ", data);

        console.log("SEtting user ", data);
        booksStore.setUser(data);
        this.loggedIn = true;
      } catch (error) {
        console.error("Error Signing in ", error);
      }
    },
    async handleLogout() {
      const supabase = useSupabaseClient();
      const booksStore = useBooksStore();

      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        this.loggedIn = false;
        booksStore.setUser(null);

        this.email = null;
        this.password = null;
      } catch (error) {
        console.error("ERROR Signing out ", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
