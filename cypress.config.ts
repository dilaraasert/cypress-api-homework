import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://jsonplaceholder.typicode.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});