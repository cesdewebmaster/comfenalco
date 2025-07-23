const path = require("path");

exports.createPages = async ({ actions, graphql }) => {

    const { data } = await graphql(`
        query GET_CDA_TREE {
            allContentfulTemplate(filter: {nombre: {eq: "Árbol categorías"}}) {
                nodes {
                referencias {
                    metadata {
                    metaTitulo
                    metaDescripcion
                    metaImagen {
                        gatsbyImageData
                        file {
                        url
                        }
                    }
                    urlCanonical
                    index
                    }
                    span
                    span2
                    h3
                    url
                    slug
                    color
                    icon
                    image {
                    title
                    file {
                        url
                    }
                    }
                    secciones {
                    h2
                    articulo {
                        h2
                        slug
                    }
                    button {
                        copy
                    }
                    }
                    referencias {
                    referencias {
                        metadata {
                        metaTitulo
                        metaDescripcion
                        metaImagen {
                            gatsbyImageData(formats: [AUTO, WEBP], placeholder: BLURRED)
                            file {
                            url
                            }
                        }
                        urlCanonical
                        index
                        }
                        span
                        url
                        slug
                        referencias {
                        h3
                        secciones {
                            h2
                            articulo {
                            h2
                            slug
                            }
                            button {
                            copy
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
            }
    `);
    const { data: dataArticles } = await graphql(`
        query GET_CAD_ARTICLES {
            allContentfulArticleTemplate {
                nodes {
                    metadata {
                        metaTitulo
                        metaDescripcion
                        metaImagen {
                        gatsbyImageData
                        file {
                            url
                        }
                        }
                        urlCanonical
                        index
                    }
                    contentful_id
                    tipoArticulo
                    slug
                    h2
                    h3
                    categoria {
                        nombreCategoria
                        slug
                        color
                    }
                    miniatura {
                        file {
                        url
                        }
                    }
                    cuerpo {
                        descripcion {
                        raw
                        references {
                            ... on ContentfulAsset {
                            contentful_id
                            title
                            gatsbyImageData(layout: FULL_WIDTH)
                            file {
                                url
                            }
                            }
                        }
                        }
                        h3
                        idVideo
                        video {
                        file {
                            url
                        }
                        }
                        boton {
                        copy
                        url
                        }
                        tipoComponente
                    }
                    tags
                    articulosRelacionados {
                        h2
                        slug
                    }
                }
            }
        }
    `);

    const { createPage } = actions;


    // SUBCATEGORIES PAGES
    const internalTemplate = path.resolve("src/components/organisms/internal-template/InternalTemplate.tsx");

    // - Se creó esta variable para estructurar mejor la data
    const categories = data.allContentfulTemplate.nodes[0].referencias.map(cat => {
        const itemCategory = {
            name: cat.span,
            desc: cat.h3 || '',
            color: cat.color,
            icon: cat.icon || '',
            slug: (cat.slug) ? cat.slug.trim() : '',
            sections:
                (cat.secciones)
                    ?
                    cat.secciones.map(section => {
                        const itemSection = {
                            name: section.h2,
                            url: `${convertToKebabCase(section.h2)}`,
                            articles:
                                (section.articulo)
                                    ?
                                    section.articulo.map(article => {
                                        const itemArticle = {
                                            name: article.h2,
                                            slug: `${article.slug}`
                                        }
                                        return itemArticle;
                                    })
                                    :
                                    []
                        }
                        return itemSection;
                    })
                    :
                    []
            ,
            subcategories:
                (cat.referencias)
                    ?
                    cat.referencias[0].referencias.map(subcat => {
                        const itemSubcat = {
                            name: subcat.span,
                            desc: (subcat.referencias) ? subcat.referencias[0].h3 : '',
                            slug: (subcat.slug) ? subcat.slug.trim() : '',
                            sections:
                                (subcat.referencias)
                                    ?
                                    subcat.referencias[0].secciones.map(section => {
                                        const itemSection = {
                                            name: section.h2,
                                            url: `${convertToKebabCase(section.h2)}`,
                                            articles:
                                                (section.articulo)
                                                    ?
                                                    section.articulo.map(article => {
                                                        const itemArticle = {
                                                            name: article.h2,
                                                            slug: `${article.slug}`
                                                        }
                                                        return itemArticle;
                                                    })
                                                    :
                                                    []
                                        }
                                        return itemSection;
                                    })
                                    :
                                    []
                            ,
                            metaDataSEO:
                                (subcat.metadata)
                                    ?
                                    {
                                        metaTitle: subcat.metadata.metaTitulo,
                                        metaDescription: subcat.metadata.metaDescripcion,
                                        metaImage: subcat.metadata.metaImagen,
                                        urlCanonical: subcat.metadata.urlCanonical,
                                        index: subcat.metadata.index,
                                        slug: (subcat.slug) ? subcat.slug.trim() : '',
                                    }
                                    : null
                        }
                        return itemSubcat;
                    })
                    :
                    []
            ,
            metaDataSEO:
                (cat.metadata)
                    ?
                    {
                        metaTitle: cat.metadata.metaTitulo,
                        metaDescription: cat.metadata.metaDescripcion,
                        metaImage: cat.metadata.metaImagen,
                        urlCanonical: cat.metadata.urlCanonical,
                        index: cat.metadata.index,
                        slug: (cat.slug) ? cat.slug.trim() : '',
                    }
                    : null
        }
        return itemCategory;
    });

    const subcategories = [];

    for (const cat of categories) {
      createPage({
        path: cat.slug,
        component: internalTemplate,
        context: {
          categories,
          subcategories: categories,
          dataSEO: cat.metaDataSEO,
        },
      })
      if (cat.subcategories?.length) {
        subcategories.push(...cat.subcategories)
      }
    }

    subcategories.forEach(node => {
        createPage({
            path: node.slug,
            component: internalTemplate,
            context: {
                categories,
                subcategories,
                dataSEO: node.metaDataSEO
            },
        })
    });


    // ARTICLES PAGES
    const articleTemplate = path.resolve("src/components/organisms/article-template/ArticleTemplate.tsx");
    const articles = dataArticles?.allContentfulArticleTemplate?.nodes.map(article => {
        const itemArticle = {
            id: article.contentful_id,
            name: article.h2,
            slug: article.slug,
            body: article.cuerpo,
            relatedArticles: article.articulosRelacionados || [],
            metaDataSEO:
                (article.metadata)
                    ?
                    {
                        metaTitle: article.metadata.metaTitulo,
                        metaDescription: article.metadata.metaDescripcion,
                        metaImage: article.metadata.metaImagen,
                        urlCanonical: article.metadata.urlCanonical,
                        index: article.metadata.index,
                        slug: (article.slug) ? article.slug.trim() : '',
                    }
                    : null
        }
        return itemArticle;
    });

    articles.forEach(node => {
        createPage({
            path: node.slug,
            component: articleTemplate,
            context: {
                categories,
                subcategories,
                articles: articles,
                dataArticle: node,
                dataSEO: node.metaDataSEO
            }
        })
    });

}


const deleteTildes = (value) => {
    value = value.replace(/á/gi, "a")
    value = value.replace(/é/gi, "e")
    value = value.replace(/í/gi, "i")
    value = value.replace(/ó/gi, "o")
    value = value.replace(/ú/gi, "u")
    value = value.replace(/ñ/gi, "n")
    return value
}


const convertToKebabCase = (name) => {
    const result = name.split(' ');
    const newResult = result.map(word => {
        return deleteTildes(word).toLowerCase();
    });

    return newResult.join('-');
}


require("ts-node").register({ files: true })
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /tiny-slider-react/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}

exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: "@babel/plugin-transform-react-jsx",
        options: {
            runtime: "automatic",
        },
    })
}