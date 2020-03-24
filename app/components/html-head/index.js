import Head from "next/head";
const basePath = require("../../../base_path");

const HtmlHead = ({ prefixTitle = "", afterPath = "" }) => {
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
        href={`${basePath()}${afterPath}`}
        hrefLang="x-default"
      />
      <link rel="canonical" href={`${basePath()}${afterPath}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta
        name="author"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์ คณะวิทยาศาสตร์และศิลปศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน"
      />
      <meta
        name="description"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์ คณะวิทยาศาสตร์และศิลปศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน | Department of Applied Mathematics and Statistics - เกี่ยวกับสาขา ข่าวประชาสัมพันธ์ ข่าวสารและกิจกรรม งานวิจัย งานวิชาการ บทความทั่วไป"
      />
      <meta
        name="keywords"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์, คณะวิทยาศาสตร์และศิลปศาสตร์, มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน, Department of Applied Mathematics and Statistics, Faculty of Sciences and Liberal Arts, Rajamangala University of Technology Isan, Thailand, rmuti, mathematics, sciences, คณิตศาสตร์, สถิติประยุกต์, มทร, มทร.อีสาน, เทคโนโคราช, เทคโน"
      />
      {/* Facebook */}
      <meta property="og:url" content={`${basePath()}${afterPath}`} />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${prefixTitle.length > 0 ? prefixTitle + " - " : ""}${title}`}
      />
      <meta
        property="og:description"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์ คณะวิทยาศาสตร์และศิลปศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน | Department of Applied Mathematics and Statistics - เกี่ยวกับสาขา ข่าวประชาสัมพันธ์ ข่าวสารและกิจกรรม งานวิจัย งานวิชาการ บทความทั่วไป"
      />
      <meta
        property="og:image"
        content="http://mathstat.rmuti.ac.th/assets/img/RMUTi_ICON.png"
      />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={`${prefixTitle.length > 0 ? prefixTitle + " - " : ""}${title}`}
      />
      <meta
        name="twitter:image"
        content="http://mathstat.rmuti.ac.th/assets/img/RMUTi_ICON.png"
      />
      <meta
        name="twitter:description"
        content="สาขาวิชาคณิตศาสตร์และสถิติประยุกต์ คณะวิทยาศาสตร์และศิลปศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน | Department of Applied Mathematics and Statistics - เกี่ยวกับสาขา ข่าวประชาสัมพันธ์ ข่าวสารและกิจกรรม งานวิจัย งานวิชาการ บทความทั่วไป"
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
    </Head>
  );
};

export { HtmlHead };
