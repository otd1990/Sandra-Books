// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  routeRules:{
    "/**": { redirect: { to: 'https://www.plumb-books.com', statusCode: 301 } },
  },
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
    },
  },
});
