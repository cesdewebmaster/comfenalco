import { useStaticQuery, graphql } from 'gatsby';
import SearchResultsBox from '../../molecules/search-results-box/SearchResultsBox';
import { useSearcher } from '../../../hooks/useSearcher';
import { changeRef } from '../../../utils/locations';

import './SearchBar.scss';

// @ts-ignore
import iconSearch from '../../../assets/icons/CDA/icon_search.svg';
// @ts-ignore
import clearSearch from '../../../assets/icons/CDA/icon_clear-search.svg';



const SearchBar = () => {

    const { allContentfulHome } = useStaticQuery(graphql`
        query GET_SEARCH_BAR_CONTENT {
            allContentfulHome(filter: { nombre: { eq: "Home CAD" } }) {
            nodes {
                banner {
                referencias {
                    placeholder
                    image {
                    title
                    file {
                        url
                    }
                    }
                    button {
                    copy
                    url
                    }
                }
                }
            }
            }
        }
    `);
    const searchBarData = {
        btnCopy: allContentfulHome.nodes[0].banner.referencias[0].button[0].copy,
        placeholder: allContentfulHome.nodes[0].banner.referencias[0].placeholder
    }

    const { onQueryChange, results, query, setQuery, showLoader } = useSearcher();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const redirect = changeRef(
            `resultados-busqueda/?query=${query}`
        );
        window?.location.assign(redirect);
    }

    return (
        <div className="m-main-search-bar">
            <form
                className="m-main-search-bar__form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className='input-group'>

                    <img className='search-icon' src={iconSearch} alt="Ícono de búsqueda" />
                    <input
                        role='searchbox'
                        type="text"
                        placeholder={`${searchBarData.placeholder}`}
                        value={query}
                        onChange={onQueryChange}
                        name='query'
                        autoComplete='off'
                        className='gtmBusacadorHome'
                    />
                    {
                        (query.length > 0) && (
                            <button type='button' className='a-clear-btn' onClick={() => setQuery('')}>
                                <img src={clearSearch} alt="limpiar campo de búsqueda" />
                            </button>
                        )
                    }
                </div>
                <button aria-label='Botón de buscar' type='submit' className='a-btn-results-page' disabled={query.length <= 2}>
                    {searchBarData.btnCopy}
                </button>
            </form>
            <div className="m-main-search-bar__results">
                {
                    (query.length > 2 && results)
                    && <SearchResultsBox results={results.slice(0, 10)} showLoader={showLoader} />
                }
            </div>
        </div >
    )
}

export default SearchBar