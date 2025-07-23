import { Link } from 'gatsby';
import { hasStartSlash } from '../../../utils/functions';
import './RelatedArticles.scss';

interface Props {
    data: any
}

const RelatedArticles = ({ data }: Props) => {
    return (
        <div className='m-related-articles'>
            <h2 tabIndex={0}>Artículos relacionados</h2>
            <ul>
                {
                    data?.map((article: any, index: number) => (
                        <li key={index}>
                            <div className='bullet'></div>
                            <Link
                                to={hasStartSlash(article.slug)}
                                rel="noopener noreferrer"
                            >
                                {article.h2}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default RelatedArticles