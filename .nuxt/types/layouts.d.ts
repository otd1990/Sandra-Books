import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "admin" | "default" | "homepage"
declare module "/Users/oliverdyer1/Sandra-Books/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}