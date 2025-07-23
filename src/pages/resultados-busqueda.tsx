import Layout from '../components/organisms/layout/layout';
import SearchResultsPage from '../components/organisms/search-results-page/SearchResultsPage';
import SEO from '../shared/components/SEO';

const ResultadosBusqueda = () => {
    return (
        <>
            <SEO title='Mi Pyme Evoluciona | Resultados de búsqueda' index={false} />
            <Layout>
                <SearchResultsPage />
            </Layout>
        </>
    )
}

export default ResultadosBusqueda