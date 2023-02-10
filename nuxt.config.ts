// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
  },
  modules: [
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt-modules/cache",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: {
            wght: [400, 600, 700],
          },
        },
        subsets: ["latin"],
        display: "swap",
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
  ],
  css: ["@/assets/css/bootstrap.min.css", "~/assets/scss/main.scss"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Sandra Plumb Books",
      meta: [
        { name: "description", content: "Sandra Pulmb Book Site." },
        { name: "theme-color", content: "#ffae6d" },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      // link: [
      //   {
      //     rel: "preconnect",
      //     href: "https://fonts.googleapis.com",
      //   },
      //   {
      //     rel: "preconnect",
      //     href: "https://fonts.gstatic.com",
      //   },
      //   {
      //     rel: "stylesheet",
      //     href: "https://fonts.googleapis.com/css2?family=&display=swap",
      //   },
      // ],
    },
  },
});
