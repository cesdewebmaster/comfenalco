import { Link } from 'gatsby';
import { SearchResult } from '../../../interfaces/Article.interface';
import { hasStartSlash } from '../../../utils/functions';
import Loader from '../../atoms/loader/Loader';
import './SearchResultsBox.scss';

interface Props {
    results: SearchResult[],
    showLoader: boolean
}

const SearchResultsBox = ({ results, showLoader }: Props) => {


    return (
        <div className='m-search-results-box'>
            {
                (showLoader)
                    ?
                    <Loader />
                    :
                    (results.length > 0)
                        ?
                        <>
                            <h3>Resultados de búsqueda</h3>
                            <hr />

                            <ul>
                                {
                                    results.map(result => (
                                        <li key={result.entryId}>
                                            <Link
                                                to={hasStartSlash(result.slug)}
                                                className={`result-item gtmBuscadorHomeprediccion${result.title.replace(/ /g, '')}`}
                                            >
                                                <h4 className={`gtmBuscadorHomeprediccion${result.title.replace(/ /g, '')}`}>{result.title}</h4>
                                                <p className={`gtmBuscadorHomeprediccion${result.title.replace(/ /g, '')}`}>{result.description}</p>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                        :
                        <h3>Sin resultados de búsqueda</h3>
            }
        </div>
    )
}

export default SearchResultsBox