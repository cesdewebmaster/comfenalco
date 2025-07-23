import Layout from '../layout/layout'
import InternalSubcategoryTemplate from '../internal-subcategory-template/InternalSubcategoryTemplate'
import SEO from '../../../shared/components/SEO'

const InternalTemplate = ({ pageContext }: any) => {

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
            <InternalSubcategoryTemplate data={pageContext} />
        </Layout>
    )
}

export default InternalTemplate;
