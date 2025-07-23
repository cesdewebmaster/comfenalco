import { createContext } from 'react';
import { GlobalContextState } from '../interfaces/GlobalContext.interface';

export const GlobalContext = createContext<GlobalContextState>({} as GlobalContextState);
