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
        "/personal": { page: "/personal" },
        "/personal/calender": { page: "/personal/calender" },
        "/news": { page: "/news" },
        "/news/academic": { page: "/news/academic" },
        "/news/activity": { page: "/news/activity" },
        "/news/join": { page: "/news/join" },
        "/news/publish": { page: "/news/publish" },
        "/contact": { page: "/contact" },
        "/bachelor": { page: "/bachelor" },
        "/article": { page: "/article" },
        "/research": { page: "/research" },
        "/apprentice": { page: "/apprentice" },
        "/seminar": { page: "/seminar" }
      };

      return paths;
    }
  })
);
