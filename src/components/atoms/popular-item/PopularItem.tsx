import { useState } from 'react';
import { Link } from 'gatsby';

import './PopularItem.scss';
import { hasStartSlash } from '../../../utils/functions';

type PopularLink = {
    name: string;
    url: string;
    icon: string;
    color: string;
}

interface Props {
    popularItem: PopularLink
}

const PopularItem = ({ popularItem }: Props) => {

    const [mouseHover, setMouseHover] = useState<boolean>(false);

    return (
        <Link
            to={hasStartSlash(popularItem.url)}
            className={`a-top-most-popular__item gtmServiciosmasusados${popularItem.name}Home`}
            key={popularItem.name}
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
        >
            <div className={`circle-container gtmServiciosmasusados${popularItem.name}Home`}>
                <i
                    style={{ color: mouseHover ?  '#6d9ee3' : '#007b72' }}
                    className={`${popularItem.icon} gtmServiciosmasusados${popularItem.name}Home`}></i>
            </div>
            <p
                style={{ color: mouseHover ? '#6d9ee3' : 'var(--color-blackred__white)' }}
                className={`gtmServiciosmasusados${popularItem.name}Home`}
            >
                {popularItem.name}
            </p>
        </Link>
    )
}

export default PopularItem