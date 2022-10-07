import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],
  css: ["@/assets/bootstrap.css", "~/assets/scss/main.scss"],
  head: {
    link: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Abyssinica+SIL&display=swap",
      },
    ],
  },
  buildModules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    useStylesheet: true,
  },
});
