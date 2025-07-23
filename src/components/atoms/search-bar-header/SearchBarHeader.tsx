import { useEffect, useState } from 'react';
import SearchResultsBox from '../../molecules/search-results-box/SearchResultsBox';
import { useSearcher } from '../../../hooks/useSearcher';
import useBrowserMode from '../../../shared/hooks/useBrowserMode';
import { changeRef } from '../../../utils/locations';

import './SearchBarHeader.scss';

// @ts-ignore
import iconSearch from '../../../assets/icons/CDA/icon_search.svg';
// @ts-ignore
import clearSearch from '../../../assets/icons/CDA/icon_clear-search.svg';


interface Props {
    dataSearchBar: any
}

const SearchBarHeader = ({ dataSearchBar }: Props) => {

    const { window } = useBrowserMode();

    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);

    useEffect(() => {
        const backdrop = document.querySelector('.a-backdrop-blur');

        if (activeSearchBar || showSearchBar) {
            backdrop?.classList.add('show');
        } else {
            backdrop?.classList.remove('show');
        }
    }, [activeSearchBar, showSearchBar]);

    const { onQueryChange, results, query, setQuery, showLoader } = useSearcher();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const redirect = changeRef(
            `resultados-busqueda/?query=${query}`
        );
        window?.location.assign(redirect);
    }

    return (
        <div className='a-search-bar'>
            <img
                className='a-search-bar__btn'
                src={dataSearchBar.image[0].file.url}
                alt={dataSearchBar.image[0].title}
                onClick={() => setShowSearchBar(true)}
            />
            {
                showSearchBar && (
                    <div className='a-search-bar__container cda-main-container'>
                        <form
                            className="search-input-group"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div className='form-control'>
                                <input
                                    type="text"
                                    placeholder='Buscador de artículos'
                                    value={query}
                                    onChange={onQueryChange}
                                    name='query'
                                    autoComplete='off'
                                    className='gtmBusacadorHome'
                                />
                                {
                                    (query.length > 0) && (
                                        <button type='button' onClick={() => setQuery('')}>
                                            <img src={clearSearch} alt="limpiar campo de búsqueda" />
                                        </button>)
                                }
                            </div>
                            <button type='submit' className='form-control-btn' disabled={query.length <= 2}>
                                <img src={iconSearch} alt="botón de buscar" />
                            </button>
                            <p
                                className='cancel-btn'
                                onClick={() => {
                                    setShowSearchBar(false)
                                    setActiveSearchBar(false)
                                    setQuery('')
                                }}
                            >
                                Cancelar
                            </p>
                        </form>
                    </div>
                )
            }

            {/* BUSCADOR DESKTOP */}
            <div className={`a-search-bar-desktop ${activeSearchBar ? 'active' : ''}`}>
                <form
                    className='search-bar-desktop'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className='input-group'>
                        <input
                            type="text"
                            placeholder='Buscador de artículos'
                            value={query}
                            onChange={onQueryChange}
                            onClick={() => setActiveSearchBar(true)}
                            name='query'
                            autoComplete='off'
                            className='gtmBusacadorHome'
                        />
                        {
                            (query.length > 0) && (
                                < button type='button' onClick={() => setQuery('')}>
                                    <img src={clearSearch} alt="limpiar campo de búsqueda" />
                                </button>
                            )
                        }
                    </div>
                    <button type='submit' className='input-btn' disabled={query.length <= 2}>
                        <img src={iconSearch} alt="botón de buscar" />
                    </button>
                </form>
                <p
                    onClick={() => {
                        setActiveSearchBar(false)
                        setShowSearchBar(false)
                        setQuery('')
                    }}>Cancelar</p>
            </div>

            {
                (query.length > 2 && results)
                && <SearchResultsBox results={results.slice(0, 10)} showLoader={showLoader} />
            }
        </div >
    )
}

export default SearchBarHeader