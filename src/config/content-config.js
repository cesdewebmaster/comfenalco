const dotenv = require('dotenv');

let activeEnv = process.env.GATSBY_ACTIVE_ENV || "development";

if (activeEnv === "development") {
    dotenv.config({ path: './src/env/.env.development' });
} else {
    (activeEnv === "staging")
        ? dotenv.config({ path: './src/env/.env.integration' })
        : dotenv.config({ path: './src/env/.env' })
}

module.exports = {
    resolve: `gatsby-source-contentful`,
    options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,

        // TODO: cambiar a develop al habilitar en el CMS
        // environment: process.env.ENVIRONMENT === 'PDN' ? 'master' : 'develop',
    }
}