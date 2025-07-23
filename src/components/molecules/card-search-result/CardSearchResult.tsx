import { Link } from 'gatsby';
import { SearchResult } from '../../../interfaces/Article.interface';
import { hasStartSlash } from '../../../utils/functions';
import './CardSearchResult.scss';

interface Props {
    resultData: SearchResult
}

const CardSearchResult = ({ resultData }: Props) => {

    return (
        <div className='m-card-search-result'>
            <div className='card-image' style={{ backgroundImage: `url(${resultData.miniatura})` }}></div>
            <div className='card-data'>
                <h3
                    className='card-data__category'
                    style={{ color: resultData.category.color, borderLeftColor: resultData.category.color }}
                >
                    {resultData.category.name}
                </h3>
                <h4 className='card-data__title'>{resultData.title}</h4>
                <p className='card-data__description'>{resultData.description}</p>
                <Link
                    className='card-data__cta'
                    to={hasStartSlash(resultData.slug)}
                    aria-label={`Enlace a ${resultData.title}`}
                >
                    Saber más
                </Link>
            </div>
        </div>
    )
}

export default CardSearchResult