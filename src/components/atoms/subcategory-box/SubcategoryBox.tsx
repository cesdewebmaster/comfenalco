import { useState } from 'react';
import { Subcategory } from '../../../interfaces/Article.interface';
import './SubcategoryBox.scss';
import { Link } from 'gatsby';

interface Props {
    subcategory: Subcategory,
    color: string
}

const SubcategoryBox = ({ subcategory, color }: Props) => {
    const [mouseHover, setMouseHover] = useState<boolean>(false);

    return (
        <Link
            to={subcategory.slug}
            className={`a-subcategories-box gtmExplorarporcategoriassubcategorias${subcategory.name.replace(/ /g, '')}Home`}
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
        >
            <div
                className={`line`}
                style={{ backgroundColor: color }}
            ></div>
            <i
                className={`icon-icon_chevron-right-1`}
                style={{
                    color: mouseHover ? color : '#303030',
                    filter: mouseHover ? 'none' : 'var(--filter-none-brightness)',
                    marginRight: '10px' // Espacio entre el icono y el texto
                }}
            ></i>
            <h3
                style={{ color: mouseHover ? color : 'var(--color-blackred__white)' }}
                className={`gtmExplorarporcategoriassubcategorias${subcategory.name.replace(/ /g, '')}Home`}
            >
                {subcategory.name}
            </h3>
        </Link>
    )
}

export default SubcategoryBox;
