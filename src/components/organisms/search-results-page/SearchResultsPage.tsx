import { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { SearchResult } from '../../../interfaces/Article.interface';
import getSearchResult from '../../../services/searcher.services';
import VideosAbout from '../../molecules/videos-about/VideosAbout';
import CardSearchResult from '../../molecules/card-search-result/CardSearchResult';
import SearchBar from '../../atoms/search-bar/SearchBar';
import Pagination from '../../atoms/pagination/Pagination';
import Loader from '../../atoms/loader/Loader';

import './SearchResultsPage.scss';
import useBrowserMode from '../../../shared/hooks/useBrowserMode';

const SearchResultsPage = () => {

    const { window } = useBrowserMode();
    const paramValue = new URLSearchParams(window?.location?.search).get('query');

    const [results, setResults] = useState<SearchResult[]>([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getSearchResult(paramValue!).then(data => {
            setResults(data!);
            setLoader(false);
        });
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(6);

    const indexOfLastPost = currentPage * resultsPerPage;
    const indexOfFirstPost = indexOfLastPost - resultsPerPage;
    const currentResults = results?.slice(indexOfFirstPost, indexOfLastPost) || [];

    const changePage = (pageNumber: number) => setCurrentPage(pageNumber)


    return (
        <>
            <div className='o-resultados-busqueda'>

                {
                    (loader)
                        ? <Loader />
                        :
                        <div className='cda-main-container'>

                            <div className='a-breadcumb'>
                                <Link to='/' className='prev-link' aria-label='Regresar al inicio'>Home</Link>
                                <span>/</span>
                                <p>Resultados de búsqueda</p>
                            </div>

                            <SearchBar />

                            {
                                (results?.length !== 0)

                                    ?

                                    <section className='m-results-section'>
                                        <h2>Resultados para "{paramValue}"</h2>
                                        <p className='m-results__subtitle'>
                                            Mostrando {currentResults?.length} {currentResults.length > 1 ? 'resultados' : 'resultado'}
                                        </p>
                                        <div className='m-results__grid'>
                                            {
                                                currentResults?.map(result => (
                                                    <CardSearchResult resultData={result} key={result.entryId} />
                                                ))
                                            }
                                        </div>

                                        {
                                            (results?.length < 6)
                                                ?
                                                <></>
                                                :
                                                <Pagination
                                                    rowsPerPage={resultsPerPage}
                                                    totalRows={results?.length}
                                                    changePage={changePage}
                                                    currentPage={currentPage}
                                                    setCurrentPage={setCurrentPage}
                                                />
                                        }

                                    </section>

                                    :

                                    <section className='m-results-section'>
                                        <h2>No encontramos resultados para “{paramValue}”</h2>
                                        <p className='m-results__subtitle m-results__subtitle--no-results'>Te sugerimos</p>
                                        <ol>
                                            <li>1. Revisar que todas las palabras estén escritas correctamente.</li>
                                            <li>2. Probar diferentes palabras clave</li>
                                            <li>3. Probar palabras clave más generales</li>
                                            <li>4. Probar menos palabras clave</li>
                                        </ol>
                                    </section>
                            }

                        </div>
                }
            </div>
            <VideosAbout />
        </>
    )
}

export default SearchResultsPage