const dotenv = require("dotenv")
const metaInfo = require("./src/shared/meta")
const manifest = require("./src/shared/manifest")
const contentConfig = require("./src/config/content-config")
const envVariablesConfig = require("./src/config/env-config")

// require("ts-node").register({ files: true })

let activeEnv = process.env.GATSBY_ACTIVE_ENV || "development"
console.log(":::::activeEnv " + activeEnv)

if (activeEnv === "development") {
  dotenv.config({ path: "./src/env/.env.development" })
} else {
  activeEnv === "staging"
    ? dotenv.config({ path: "./src/env/.env.integration" })
    : dotenv.config({ path: "./src/env/.env" })
}

module.exports = {
  pathPrefix: `/ayuda/`,
  siteMetadata: metaInfo,
  plugins: [
    manifest,
    contentConfig,
    envVariablesConfig,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: process.env.SITE_URL,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    // {
    //   resolve: `gatsby-plugin-canonical-urls`,
    //   options: {
    //     siteUrl: process.env.SITE_URL,
    //   },
    // },
    {
      resolve: "gatsby-plugin-google-marketing-platform",
      options: {
        includeInDevelopment: true,
        tagmanager: {
          id: process.env.GTM_ID,
        },
        optimize: {
          id: process.env.GTM_ID,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GTAGM_ID,
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: true, // optional parameter to include script in development
        id: process.env.HOTJAR_ID,
        sv: process.env.HOTJAR_SNIPPET_VERSION,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/",
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        // host: process.env.SITE_URL,
        sitemap: process.env.SITE_URL + "/sitemap-index.xml",
        resolveEnv: () => process.env.ENVIRONMENT,
        env: {
          DEV: {
            policy: [{ userAgent: "*", disallow: ["/", "*/*.js", "*/*.css"] }],
          },
          QA: {
            policy: [{ userAgent: "*", disallow: ["/", "*/*.js", "*/*.css"] }],
          },
          PDN: {
            policy: [{ userAgent: "*", allow: ["/"] }],
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GA_TRACKING_ID, // Asegúrate de tener tu ID en las variables de entorno
        head: true, // Opcional: carga en el <head>
        anonymize: true, // Opcional: anonimiza las direcciones IP 
      },
    },    
  ],
}
