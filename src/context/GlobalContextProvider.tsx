import { useState } from 'react';
import { useFontSizeSettings } from '../hooks/useFontSizeSettings';
import { GlobalContextState, Tabs } from '../interfaces/GlobalContext.interface';
import { GlobalContext } from './GlobalContext';


interface props {
    children: JSX.Element | JSX.Element[]
}


export const GlobalContextProvider = ({ children }: props) => {

    const { fontSizeValue, setFontSizeToLocalStorage } = useFontSizeSettings();
    const [selectedTab, setSelectedTab] = useState<Tabs>('personas');

    const context: GlobalContextState = {
        fontSize: { get: fontSizeValue, set: setFontSizeToLocalStorage },
        selectedTab: { get: selectedTab, set: setSelectedTab }
    }

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider