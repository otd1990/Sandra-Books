import { useBooksStore } from "@/store/BooksStore";

export const useLogOut = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const booksStore = useBooksStore();

  try {
    await $fetch("/api/_supabase/session", {
      method: "POST",
      body: { event: "SIGNED_OUT", session: null },
    });
  } catch (error) {
    console.log("there was an error");
    return;
  }

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    user.value = null;
    booksStore.setUser(null);

    // navigateTo("/admin");
  } catch (error) {
    console.error("ERROR Signing out ", error);
  }
};
