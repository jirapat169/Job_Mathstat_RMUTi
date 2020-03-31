import Head from "next/head";
const basePath = require("../../../base_path");

const HtmlHead = ({
  prefixTitle = "",
  path = "",
  img = `${basePath()}assets/img/RMUTi_ICON.png`
}) => {
  var title =
    "สาขาวิชาคณิตศาสตร์และสถิติประยุกต์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา";
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{`${
        prefixTitle.length > 0 ? prefixTitle + " - " : ""
      }${title}`}</title>
      <meta
        name="google-site-verification"
        content="335efhmKom1PcdZJeu94nUwhwm2j2LOxI2fbD7uNXaA"
      />
      <link
        rel="alternate"
        href={`${basePath()}${path}`}
        hrefLang="x-default"
      />
      <link rel="canonical" href={`${basePath()}${path}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta
        name="author"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์ คณะวิทยาศาสตร์และศิลปศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน"
      />
      <meta
        name="description"
        content={`${
          prefixTitle.length > 0 ? prefixTitle + " - " : ""
        }${title}, Department of Applied Mathematics and Statistics, Rajamangala University of Technology Isan, Thailand`}
      />
      <meta
        name="keywords"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์, คณะวิทยาศาสตร์และศิลปศาสตร์, มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน, Department of Applied Mathematics and Statistics, Faculty of Sciences and Liberal Arts, Rajamangala University of Technology Isan, Thailand, rmuti, mathematics, sciences, คณิตศาสตร์, สถิติประยุกต์, มทร, มทร.อีสาน, เทคโนโคราช, เทคโน"
      />
      {/* Facebook */}
      <meta property="og:url" content={`${basePath()}${path}`} />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${prefixTitle.length > 0 ? prefixTitle + " - " : ""}${title}`}
      />
      <meta
        property="og:description"
        content={`${
          prefixTitle.length > 0 ? prefixTitle + " - " : ""
        }${title}, Department of Applied Mathematics and Statistics, Rajamangala University of Technology Isan, Thailand`}
      />
      <meta property="og:image" content={img} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={`${prefixTitle.length > 0 ? prefixTitle + " - " : ""}${title}`}
      />
      <meta name="twitter:image" content={img} />
      <meta
        name="twitter:description"
        content={`${
          prefixTitle.length > 0 ? prefixTitle + " - " : ""
        }${title}, Department of Applied Mathematics and Statistics, Rajamangala University of Technology Isan, Thailand`}
      />
      {/* CSS */}

      <link
        rel="icon"
        type="image/png"
        href={`${basePath()}assets/img/RMUTi_ICON.png`}
      />

      <link
        rel="stylesheet"
        href={`${basePath()}assets/css/Material_Icon/material-icons.css`}
      />
      <link rel="stylesheet" href={`${basePath()}assets/css/notfound.css`} />
      <link
        rel="stylesheet"
        href={`${basePath()}assets/css/bootstrap.min.css`}
      />
      <link
        rel="stylesheet"
        href={`${basePath()}assets/css/Font_Promp/promp.css`}
      />
      <link
        rel="stylesheet"
        href={`${basePath()}assets/css/Froala/froala_editor.pkgd.min.css`}
      />
      <link
        rel="stylesheet"
        href={`${basePath()}assets/css/Froala/plugins.pkgd.css`}
      />
      <link
        rel="stylesheet"
        href={`${basePath()}assets/css/Froala/froala_style.min.css`}
      />
    </Head>
  );
};

export { HtmlHead };
