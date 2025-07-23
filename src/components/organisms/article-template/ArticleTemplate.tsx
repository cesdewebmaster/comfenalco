import Layout from '../layout/layout';
import ArticlePage from '../article-page/ArticlePage';
import SEO from '../../../shared/components/SEO';

const ArticleTemplate = ({ pageContext }: any) => {

    return (
        <Layout>
            <SEO
                title={pageContext.dataSEO?.metaTitle}
                description={pageContext.dataSEO?.metaDescription}
                index={pageContext.dataSEO?.index}
                urlCanonical={pageContext.dataSEO?.urlCanonical}
                ogImage={pageContext.dataSEO?.metaImage?.file?.url}
                slug={pageContext.dataSEO?.slug}
            />
            <ArticlePage data={pageContext} />
        </Layout>
    )
}

export default ArticleTemplate