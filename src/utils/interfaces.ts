

// Chart interface
interface IPriceData {
    index: number;
    year: number;
    date: string;
    price: number;
}

interface IPrices {
    firstPriceData: IPriceData;
    lastPriceData: IPriceData;
}

interface IPricesContext {
    prices: IPrices;
    setPrices: (value: IPrices) => void;
}
  


interface ICardContext {
    cardActive: number|undefined;
    setCardActive: (value: number|undefined) => void;
}

export type {
    IPriceData,
    IPrices,
    IPricesContext,
    ICardContext
}

