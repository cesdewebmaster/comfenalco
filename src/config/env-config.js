module.exports = {
    resolve: `gatsby-plugin-env-variables`,
    options: {
        allowList: [
            "ENVIRONMENT",
            "CONTENTFUL_SPACE_ID",
            "CONTENTFUL_ACCESS_TOKEN",
            "SITE_URL",
            "FACEBOOK_DOMAIN_VERIFICATION",
            "GOOGLE_SITE_VERIFICATION"
        ]
    }
}