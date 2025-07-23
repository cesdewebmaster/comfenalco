import PopularItem from '../../atoms/popular-item/PopularItem';

interface Props {
    mostUsedData: any
}

import './HomePopulars.scss';

const HomePopulars = ({ mostUsedData }: Props) => {

    const topPopular = [
        {
            name: mostUsedData.topPopular[0].span,
            url: mostUsedData.topPopular[0].url,
            icon: mostUsedData.topPopular[0].icon,
            color: mostUsedData.topPopular[0].color
        },
        {
            name: mostUsedData.topPopular[1].span,
            url: mostUsedData.topPopular[1].url,
            icon: mostUsedData.topPopular[1].icon,
            color: mostUsedData.topPopular[1].color
        },
        {
            name: mostUsedData.topPopular[2].span,
            url: mostUsedData.topPopular[2].url,
            icon: mostUsedData.topPopular[2].icon,
            color: mostUsedData.topPopular[2].color
        },
        {
            name: mostUsedData.topPopular[3].span,
            url: mostUsedData.topPopular[3].url,
            icon: mostUsedData.topPopular[3].icon,
            color: mostUsedData.topPopular[3].color
        },
        {
            name: mostUsedData.topPopular[4].span,
            url: mostUsedData.topPopular[4].url,
            icon: mostUsedData.topPopular[4].icon,
            color: mostUsedData.topPopular[4].color
        },
    ];

    return (
        <div className='m-home-populars'>
            <div className='m-home-populars__container cda-main-container'>
                <div className='section__title'>
                    <h2>{mostUsedData.title}</h2>
                    {/* <p>Estos son los servicios más buscados entre nuestros usuarios.</p> */}
                </div>
                <div className='a-top-most-popular'>
                    <div className='a-top-most-popular__container'>
                        {
                            topPopular.map((popularItem: any) => (
                                <PopularItem
                                    key={popularItem.name}
                                    popularItem={popularItem}
                                />
                            ))
                        }
                    </div>
                </div>
                <small>Desliza lateralmente para ver más servicios</small>
            </div>
        </div>
    )
}

export default HomePopulars