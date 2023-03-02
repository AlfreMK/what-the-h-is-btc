
interface IPriceData {
    index: number;
    year: number;
    date: string;
    price: number;
  }

const parseData = (data: number[], index: number): IPriceData => (
    {
        index: index,
        year: new Date(data[0]).getFullYear(),
        date: getDate(data[0]),
        price: Math.round(data[1]),
    }
)

const getDate = (date: number): string => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const monthString = fillZero(dateObject.getMonth() + 1);
    const datString = fillZero(dateObject.getDate());
    return `${year}-${monthString}-${datString}`;
}

const fillZero = (number: number): string => {
    return number < 10 ? `0${number}` : `${number}`;
}


async function getDataFromBegginingOfTime(): Promise<IPriceData[]> {
    // powered by coingecko
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=weekly`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.prices.map(
            (priceData: number[], index: number) => parseData(priceData, index)
        );
        return results;
        }
        catch(error){
            console.error(error);
        }
        return [];
}


export {
    getDataFromBegginingOfTime,

};