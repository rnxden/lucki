import { type Config } from "prettier";

const config: Config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/index.css",
};

export default config;
