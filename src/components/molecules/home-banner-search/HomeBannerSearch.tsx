import SearchBar from '../../atoms/search-bar/SearchBar';
import './HomeBannerSearch.scss';

interface Props {
    bannerData: any;
}

const HomeBannerSearch = ({ bannerData }: Props) => {
    return (
        <div className="m-banner-search" style={{ backgroundImage: `url(${bannerData.bgImage})` }}>
            <div className="m-banner-search-container cda-main-container">
                <div className='image_logo_pyme'>
                    <img src={bannerData.bgLogo} alt="Logo MiPyme" />
                </div>
                <div className="search-bar-container">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
};

export default HomeBannerSearch;
