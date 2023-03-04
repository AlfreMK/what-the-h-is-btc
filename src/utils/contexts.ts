import { createContext } from 'react';
import { ICardContext, IPricesContext } from './interfaces';

const CardContext = createContext({} as ICardContext);
const PricesContext = createContext({} as IPricesContext);


export {
    PricesContext,
    CardContext
}
