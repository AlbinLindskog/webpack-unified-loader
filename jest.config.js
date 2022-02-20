import { isESM } from "./test/utils.js";

const configCJS = {
  "transformIgnorePatterns": [
    "node_modules/(?!unified|bail|is-plain-obj|trough|vfile|unist-util-stringify-position)"
  ],
  "transform": {
    "loader.cjs": "babel-jest",
    "\\.[jt]sx?$": "babel-jest",
  }
}

const configESM = {}

const config = isESM ? configESM : configCJS;

export default config