import SEO from "../shared/components/SEO"
import Layout from "../components/organisms/layout/layout"
import Page404 from "../components/organisms/404-page/Page404"

const NotFoundPage = () => (
  <>
    <SEO title="Página no encontrada" index={false} />
    <Layout>
      <Page404 />
    </Layout>
  </>
)

export default NotFoundPage
