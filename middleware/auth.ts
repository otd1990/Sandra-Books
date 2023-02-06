export default async function (nuxtApp: any) {
  const routeName = nuxtApp.name;
  const user = useSupabaseUser();

  if (!user.value && routeName !== "admin") {
    return navigateTo("/admin");
  }
}
