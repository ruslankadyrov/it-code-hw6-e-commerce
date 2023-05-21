import makeRequest from "../httpClient";

export const fetchProducts = () =>
  makeRequest({
    method: "get",
    url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA,YNDX,MSFT,BA,KO,IBM,V,AXP,F,INTC,EBAY,DELL,AMZN?apikey=39c41689f9fab5f0dcf71b542172366c",
  });
