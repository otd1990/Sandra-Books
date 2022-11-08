import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  css: ["@/assets/css/bootstrap.css", "~/assets/scss/main.scss"],
  head: {
    title: "Sandra Plumb Books",
    meta: [
      // <meta name="description" content="My amazing site">
      { name: "description", content: "Sandra Pulmb Book Site." },
      { name: "theme-color", content: "#ffae6d" },
    ],
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
  buildModules: [
    [
      "@nuxt-modules/cache",
      {
        browser: {
          pages: [
            ["/", { "max-age": 3600, "stale-when-revalidate": 10 }],
            ["/books", { "max-age": 3600, "stale-when-revalidate": 10 }],
            ["/reviews", { "max-age": 3600, "stale-when-revalidate": 10 }],
            [
              "/illustrations",
              { "max-age": 3600, "stale-when-revalidate": 10 },
            ],
            ["/downloads", { "max-age": 3600, "stale-when-revalidate": 10 }],
          ],
        },
      },
    ],
  ],
});
