import { useBooksStore } from "@/store/BooksStore";

export default async function (nuxtApp: any) {
  const bookStore = useBooksStore(nuxtApp.$pinia);
  const routeName = nuxtApp.name;

  if (process.client) {
    try {
      await bookStore.getAllReviews();
      await bookStore.getContactData();
    } catch (error) {
      console.error("there was a problem");
    }
    const localStore = JSON.parse(
      localStorage.getItem("supabase.auth.token") as any
    );
    const user = localStore !== null ? localStore.currentSession.user : null;

    if (user === null && routeName !== "admin") {
      return navigateTo("/admin");
    }
  }
}
