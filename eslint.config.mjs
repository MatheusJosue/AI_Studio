import type { Linter } from "eslint";

const config: Linter.Config = {
  extends: ["next/core-web-vitals"],
  rules: {
    "react/no-unescaped-entities": "warn",
  },
};

export default config;
