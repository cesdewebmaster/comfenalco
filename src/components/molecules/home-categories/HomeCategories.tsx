import { Category } from '../../../interfaces/Article.interface';
// import HomeAccordeons from '../home-accordeons/HomeAccordeons'
import HomeCategoriesSelector from '../home-categories-selector/HomeCategoriesSelector'

import './HomeCategories.scss';


interface Props {
    dataCategoriesHome: {
        title: string,
        descrip: string,
        dataCategories: Category[];
    }
}

const HomeCategories = ({ dataCategoriesHome }: Props) => {
    return (
        <div className='m-home-categories__container'>
            <div className='m-home-categories cda-main-container'>

                {/* Mobile */}
                {/* <HomeAccordeons dataCategoriesHome={dataCategoriesHome} /> */}

                {/* Desktop */}
                <HomeCategoriesSelector dataCategoriesHome={dataCategoriesHome} />
            </div>
        </div>
    )
}

export default HomeCategories