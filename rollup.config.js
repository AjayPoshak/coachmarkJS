import { terser } from "rollup-plugin-terser";
export default {
  input: "./index.js",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs"
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      plugins: [terser()]
    }
  ]
};
