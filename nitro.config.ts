import { defineNitroConfig } from "nitropack";
export default defineNitroConfig({
  compressPublicAssets: {
    brotli: true,
    gzip: true,
  },
});
