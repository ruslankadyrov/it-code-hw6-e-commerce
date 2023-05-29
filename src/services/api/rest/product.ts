import makeRequest from "../httpClient";

export const fetchProducts = () =>
  makeRequest({
    method: "get",
    url: "https://financialmodelingprep.com/api/v3/profile/ABBV,AAPL,NVDA,YNDX,MSFT,BA,KO,IBM,V,AXP,F,INTC,EBAY,DELL,AMZN,T,VZ,O,CBP,GIS,PFE,DRI,?apikey=39c41689f9fab5f0dcf71b542172366c",
  });
