import { useState, useEffect } from "react";
import useBrowserMode from "./useBrowserMode";

const useChangeTheme = () : Array<any> => {
   
   const [isDark, setIsDark] = useState<boolean>(false);
   const { isBrowser, window, document, localStorage } = useBrowserMode();
   const [isSystemDark, setIsSystemDark] = useState<boolean>(false);

   const DARK_MODE= 'dark-mode';
   const LIGHT_MODE = 'light-mode';
   const CLASS_THEME = 'class_theme';

   useEffect(() => {
      if ( isBrowser ) {
         const prefDark = window.matchMedia('(prefers-color-scheme: dark)');
         const dataTheme = localStorage.getItem(CLASS_THEME);
         if( dataTheme ) {
            document.body.classList.add(dataTheme);
            setIsDark( dataTheme ===  DARK_MODE );
         } else {
            setIsDark( prefDark.matches );
         }
         setIsSystemDark( prefDark.matches );
         prefDark && prefDark.addListener( event => {
            if( !isApplyMode() ) {
               setIsDark(event.matches);
            }
            setIsSystemDark(event.matches);
         });
      }
   }, []);

   const isApplyMode = () => {
      return isBrowser && ( document.body.classList.contains(LIGHT_MODE) || document.body.classList.contains(DARK_MODE) )
   }

   const changeDarkMode = () => {
      const classTheme = isSystemDark ? LIGHT_MODE : DARK_MODE;
      const classBody = document.body.classList;
      if ( ( !isSystemDark && classBody.contains(DARK_MODE) ) || ( isSystemDark && classBody.contains(LIGHT_MODE) ) ) {
         classBody.toggle(classTheme);
         setIsDark(isSystemDark);
         localStorage.removeItem(CLASS_THEME);
      } else {
         classBody.toggle(classTheme);
         setIsDark(!isSystemDark);
         localStorage.setItem(CLASS_THEME, classTheme);
      }
   }
   
   return [isDark, changeDarkMode];
}

export default useChangeTheme;
