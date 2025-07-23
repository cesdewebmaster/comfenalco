
interface BrowserInterface {
   isBrowser: boolean;
   localStorage: Storage ;
   sessionStorage: Storage;
   window: Window;
   document: Document;
   navigator: Navigator;
}

const useBrowserMode = () : BrowserInterface => {

   const isBrowser = typeof window !== 'undefined';

   return { 
      isBrowser,
      localStorage: isBrowser ? localStorage : ({} as Storage) ,
      sessionStorage: isBrowser ? sessionStorage : ({} as Storage),
      window: isBrowser ? window : ({} as Window),
      document: isBrowser ? document : ({} as Document),
      navigator: isBrowser ? navigator : ({} as Navigator)
   }
}

export default useBrowserMode;
