const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const basePath = require("./base_path");

module.exports = withCSS(
  withSass({
    exportTrailingSlash: true,
    assetPrefix: basePath(),
    exportPathMap: async function() {
      const paths = {
        "/": { page: "/" },
        "/admin": { page: "/admin" },
        "/history": { page: "/history" },
        "/personal": { page: "/personal" }
      };

      return paths;
    }
  })
);
