import { useContext, useState } from 'react';
import { GlobalContext } from '../../../../../context/GlobalContext';
import useChangeTheme from '../../../../../shared/hooks/useChangeTheme';
import useKey from '../../../../../hooks/useKeyPress';
import FontSizeSettings from '../../../../atoms/font-size-settings/FontSizeSettings';

import './UserTypeSelector.scss';

// @ts-ignore
import userIcon from '../../../../../assets/icons/CDA/icon_user.svg';
// @ts-ignore
import buildingIcon from '../../../../../assets/icons/CDA/icon_building.svg';
// @ts-ignore
import increaseFontIcon from '../../../../../assets/icons/CDA/icon_font-increase.svg';
// @ts-ignore
import moonIcon from '../../../../../assets/icons/CDA/icon_moon.svg';
// @ts-ignore
import sunIcon from '../../../../../assets/icons/CDA/icon_sun.svg';



interface Props {
    dataHeader: any
}

const UserTypeSelector = ({ dataHeader }: Props) => {

    const headerLink = {
        url: dataHeader.nodes[0].url,
        text: dataHeader.nodes[0].span
    };
    const tabsData = [
        {
            icon: dataHeader.nodes[0].referencias[0].image[0].file.url,
            text: dataHeader.nodes[0].referencias[0].span,
            titleAtt: dataHeader.nodes[0].referencias[0].image[0].title
        },
        {
            icon: dataHeader.nodes[0].referencias[1].image[0].file.url,
            text: dataHeader.nodes[0].referencias[1].span,
            titleAtt: dataHeader.nodes[0].referencias[1].image[0].title
        }
    ]

    const [showFontSettings, setShowFontSettings] = useState<boolean>(false);
    const [isDark, changeDarkMode] = useChangeTheme();

    const { selectedTab } = useContext(GlobalContext);

    const handleEscape = () => {
        setShowFontSettings(false)
    }

    useKey('Escape', handleEscape);

    return (
        <>
            <div className="m-header__link-mobile-only">
                <a
                    href={headerLink.url}
                    target='_blank'
                    aria-label='Enlace a página oficial Comfama'
                    className='gtmRedireccioncomfama.com'
                >
                    {headerLink.text}
                </a>
            </div>
            <div className='m-header__user-type-selector-container'>
                <div className="m-header__user-type-selector">
                    <div
                        className={`a-header-tab ${(selectedTab.get === 'personas' ? 'a-header-tab--active' : '')}`}
                        onClick={() => selectedTab.set('personas')}
                        title={tabsData[0].titleAtt}
                    >
                        <img
                            src={tabsData[0].icon}
                            alt="icon-users"
                        />
                        <p>{tabsData[0].text}</p>
                    </div>
                    <div
                        className={`a-header-tab ${(selectedTab.get === 'empresas' ? 'a-header-tab--active' : '')}`}
                        onClick={() => selectedTab.set('empresas')}
                        title={tabsData[1].titleAtt}
                    >
                        <img
                            src={tabsData[1].icon}
                            alt="icon_building"
                        />
                        <p>{tabsData[1].text}</p>
                    </div>
                    <div className="a-accesibility-link">
                        <button
                            onClick={() => setShowFontSettings(!showFontSettings)}
                        >
                            <img src={increaseFontIcon} alt="Botón para aumentar o disminuir el tamaño de la letra" />
                        </button>

                        {showFontSettings && <FontSizeSettings device='desktop' />}

                        <button onClick={changeDarkMode}>
                            <img src={isDark ? sunIcon : moonIcon} alt="Botón para cambiar el tema de la página" />
                        </button>
                        <a
                            href={headerLink.url}
                            target='_blank'
                            aria-label='Enlace a página oficial Comfama'
                            className='gtmRedireccioncomfama.com'
                        >
                            {headerLink.text}
                        </a>
                    </div>
                </div>
            </div>
            {showFontSettings && <div className='font-size-settings-bg' onClick={() => setShowFontSettings(false)}></div>}
        </>
    )
}

export default UserTypeSelector