import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// @ts-ignore
import favicon from "../assets/images/favicon.ico";
import { hasStartSlash } from '../../utils/functions';

interface Props {
    title: string,
    lang?: string,
    description?: string,
    index?: boolean, // NoIndex tag
    urlCanonical?: string,
    ogImage?: string,
    slug?: string
}

const SEO = (props: Props) => {

    // console.log('Props SEO:', props);

    const { site, allFile } = useStaticQuery(graphql`
        query GET_SITE_METADATA {
            site {
                siteMetadata {
                    title
                    siteUrl
                    description
                    author
                }
            }
            allFile(filter: {name: {eq: "logo_1x1"}}) {
                nodes {
                    relativePath
                    publicURL
                }
            }
        }
    `);

    const {
        title,
        lang,
        description,
        index,
        urlCanonical,
        ogImage,
        slug
    } = props;

    const seoData = {
        lang: lang || 'es',
        title: title || site.siteMetadata.title,
        description: description || site.siteMetadata.description,
        index: index || true,
        urlCanonical: urlCanonical || (typeof window !== 'undefined' ? window.location.href : ''),
        ogImageURL: (ogImage) ? `https:${ogImage}` : site.siteMetadata.siteUrl + allFile.nodes[0].publicURL,
        siteFullURL: (slug) ? `${site.siteMetadata.siteUrl}${hasStartSlash(slug)}` : site.siteMetadata.siteUrl,
        author: site.siteMetadata.author
    }

    // console.log('Data SEO armada:', seoData);

    return (
        <Helmet
            title={seoData.title}
            htmlAttributes={{ lang: seoData.lang }}
            meta={[
                { name: `description`, content: seoData.description },
                { property: `image`, content: seoData.ogImageURL },
                { property: `og:title`, content: seoData.title },
                { property: `og:description`, content: seoData.description },
                { property: `og:image`, content: seoData.ogImageURL },
                { property: `og:image:width`, content: `400` },
                { property: `og:image:height`, content: `300` },
                { property: `og:type`, content: `website` },
                { property: `og:url`, content: seoData.siteFullURL },

                // { name: `facebook-domain-verification`, content: process.env.FACEBOOK_DOMAIN_VERIFICATION },

                { name: `twitter:card`, content: `summary_large_image` },
                { name: `twitter:creator`, content: seoData.author },
                { name: `twitter:title`, content: seoData.title },
                { name: `twitter:description`, content: seoData.description },
                { name: `twitter:image`, content: seoData.ogImageURL },
                { name: `robots`, content: `max-image-preview:large` },

                // {
                //     name: "google-site-verification",
                // content: process.env.GOOGLE_SITE_VERIFICATION,
                // },
            ]}
        >
            <link rel="icon" type="image/ico" href={favicon} />

            {(!seoData.index) && <meta name="robots" content="noindex"></meta>}

            <link
                rel="canonical"
                href={seoData.urlCanonical}
                data-baseprotocol="https:"
                data-basehost="www.comfenalco.com"
            />
        </Helmet>
    )
}

export default SEO