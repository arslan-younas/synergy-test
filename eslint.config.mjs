import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [...nextVitals, ...nextTs];
config.push({
  rules: {
    "react/no-unescaped-entities": "off",
  },
});

export default config;
