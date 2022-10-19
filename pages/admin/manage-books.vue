<template>
  <div class="container my-3">
    <h1 class="text-center">Manage Books</h1>
    <p class="text-center">
      Here you can manage your books. Edit, delete or change whether they show
      on the homepage
    </p>
    <section class="manage-books">
      <div v-for="book in books" :key="book.id" class="book">
        <div
          v-if="
            (!editing && !bookToEdit) ||
            (bookToEdit && bookToEdit.id !== book.id)
          "
        >
          <div class="book__head">
            <div>
              <h5>Title:</h5>
              {{ book.title }}
            </div>
            <div @click="() => editBook(book)">Edit This Book</div>
          </div>
          <div class="book__desc">
            <h5>Description:</h5>
            <p>{{ book.desc }}</p>
          </div>
          <div class="book__extract">
            <h5>Extract</h5>
            <p>{{ book.extract }}</p>
          </div>
          <div class="book__quote">
            <h5>Quote</h5>
            <p>{{ book.quote }}</p>
          </div>
          <div class="book__info">
            <div>
              <h5>Published</h5>
              <p>{{ book.publishedDate }}</p>
            </div>
            <div>
              <h5>Price</h5>
              <p>{{ book.price }}</p>
            </div>
            <div>
              <h5>Image</h5>
              <img :src="book.image" :alt="book.title" />
            </div>
          </div>
        </div>
        <div v-if="editing && bookToEdit.id === book.id">
          <div @click="cancelEdit">Cancel Editing</div>
          <EditBookForm
            :book="bookToEdit"
            @formEditSuccess="handleEditSuccess"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useBooksStore } from "~~/store/BooksStore";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";

import EditBookForm from "@/components/forms/EditBookForm.vue";
import "./scss/manage-books.scss";

export default {
  name: "ManageBooksPage",
  components: {
    EditBookForm,
  },
  setup() {
    const bookStore = useBooksStore();
    const { books } = storeToRefs(bookStore);

    watchEffect(() => {
      console.log("BOOKS CHANGED ", books);
    });

    return { books };
  },
  data() {
    return {
      editing: false,
      bookToEdit: undefined,
    };
  },
  methods: {
    editBook(book) {
      console.log("BOok ", book);
      this.bookToEdit = book;
      this.editing = true;

      console.log(this.bookToEdit.id === book.id);
    },
    cancelEdit() {
      this.bookToEdit = undefined;
      this.editing = false;
    },
    handleEditSuccess() {
      this.cancelEdit();
      const bookStore = useBooksStore();
      this.books = bookStore.getBooks;
    },
  },
};
</script>

<style lang="scss" scoped>
.book {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
