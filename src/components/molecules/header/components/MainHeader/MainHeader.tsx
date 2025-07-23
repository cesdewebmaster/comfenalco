import { Link } from 'gatsby';
import BurgerMenu from '../../../../atoms/burger-menu/BurgerMenu';
import SearchBarHeader from '../../../../atoms/search-bar-header/SearchBarHeader';
import { showHideOnHome } from '../../../../../utils/functions';

import './MainHeader.scss';

// @ts-ignore
import logoCDA from '../../../../../assets/images/CDA/image_CDA-logo.png';


interface Props {
    dataHeader: any
}

const MainHeader = ({ dataHeader }: Props) => {

    const logoCDA = {
        src: dataHeader.nodes[0].image[0].file.url,
        titleAtt: dataHeader.nodes[0].image[0].title
    }

    return (
        <div className='m-header__main-header-container'>
            <div className="m-header__main-header cda-main-container">
                <BurgerMenu />
                <Link
                    to="/"
                    onClick={() => document.body.classList.remove("noscroll")}
                >
                    <img
                        className="a-logo-cda"
                        src={logoCDA.src}
                        alt="Logo y enlace a la página principal del Centro de ayuda Comfenalco"
                        title={logoCDA.titleAtt}
                    />
                </Link>

                {showHideOnHome() && <SearchBarHeader dataSearchBar={dataHeader.nodes[0].referencias[2]} />}
            </div>
        </div >
    )
}

export default MainHeader