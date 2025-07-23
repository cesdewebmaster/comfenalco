import { Link } from 'gatsby';
import { Category, Subcategory } from '../../../interfaces/Article.interface';
import './Breadcumbs.scss';

interface Props {
    selectedSubcategory: Category | Subcategory,
    articleName: string
}

const Breadcumbs = ({ selectedSubcategory, articleName }: Props) => {

    return (
        <nav className='a-breadcumbs'>
            <ul>

                <li>
                    <Link aria-label='Regresar al inicio' to='/'>Home</Link>
                    <span>/</span>
                </li>
                <li>
                    <Link aria-label={`Ir a ${selectedSubcategory?.name}`} to={`/${selectedSubcategory?.slug}`}>{selectedSubcategory?.name}</Link>
                    <span>/</span>
                </li>
                <li>
                    <a>{articleName}</a>
                </li>
            </ul>
        </nav>
    )
}

export default Breadcumbs