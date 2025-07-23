import { useEffect, useState } from "react";
import useBrowserMode from "../shared/hooks/useBrowserMode";


export const useFontSizeSettings = () => {

    const { isBrowser } = useBrowserMode();
    const [fontSizeValue, setFontSizeValue] = useState(0);

    useEffect(() => {
        if (isBrowser) {
            const valueFontSize: number = parseInt(localStorage.getItem('font-size') || '100');
            const htmlElement = document.querySelector('html')!;
            htmlElement.style.fontSize = `${valueFontSize}%`;
            setFontSizeValue(valueFontSize);
        }
    }, []);

    const setFontSizeToLocalStorage = (size: number) => {
        localStorage.setItem('font-size', `${size}`);
        setFontSizeValue(size);
    }

    return {
        fontSizeValue,
        setFontSizeToLocalStorage
    }

}
