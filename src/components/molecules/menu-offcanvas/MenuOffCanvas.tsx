import { useState } from 'react';
import useChangeTheme from '../../../shared/hooks/useChangeTheme';
import { showHideOnHome } from '../../../utils/functions';
import FontSizeSettings from '../../atoms/font-size-settings/FontSizeSettings';
import TreeMobile from '../tree-mobile/TreeMobile';

import './MenuOffCanvas.scss';

// @ts-ignore
import increaseFontIcon from '../../../assets/icons/CDA/icon_font-increase.svg';
// @ts-ignore
import moonIcon from '../../../assets/icons/CDA/icon_moon.svg';
// @ts-ignore
import sunIcon from '../../../assets/icons/CDA/icon_sun.svg';


const MenuOffCanvas = () => {

    const [isDark, changeDarkMode] = useChangeTheme();
    const [showFontSettings, setShowFontSettings] = useState<boolean>(false);

    return (
        <div className='m-menu-offcanvas cda-main-container'>
            <div className='accesibility-buttons'>
                <button tabIndex={-1} onClick={() => setShowFontSettings(!showFontSettings)}>
                    <img
                        src={increaseFontIcon}
                        alt="Botón para incrementar y disminuir tamaño de letra"
                    />
                    <p>Tamaño de letra</p>
                </button>

                {showFontSettings && <FontSizeSettings device='mobile' />}

                <button tabIndex={-1} onClick={changeDarkMode}>
                    <img
                        src={isDark ? sunIcon : moonIcon}
                        alt="Botón para cambiar el tema de la página"
                    />
                    <p>Modo {isDark ? 'claro' : 'oscuro'}</p>
                </button>
            </div>

            {/* TODO: HACER COMPONENTE DE ÁRBOL CUANDO TOQUE SU SPRINT */}
            { showHideOnHome() && <TreeMobile /> }
        </div>
    )
}

export default MenuOffCanvas