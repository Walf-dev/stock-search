import axios from 'axios';
import { useState, useEffect } from 'react';

const API_KEY = 'DXUJCP3F249YESLV';
//3YROQALYDS8I7790
const API_BASE_URL = 'https://www.alphavantage.co/query';

const StockDetail = ({stockSymbol}) => {
  const [stockDetail, setStockDetail] = useState(null);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const viewStockDetail = () => {
      axios.get(`${API_BASE_URL}`, {
        params: {
          function: 'OVERVIEW',
          symbol: stockSymbol,
          apikey: API_KEY
        }
      }).then(json => {
        console.log(json.data)
        setStock(stockSymbol);
        setStockDetail(json.data);
      })
    }
    if (stockSymbol && stockSymbol !== stock) {
      viewStockDetail();
    }    
  }, [stockSymbol, stockDetail, stock]);
  
  return (
    (stockDetail?.hasOwnProperty('Description')) ? (
      <div className='stock-detail-container'>
        <div className='stock-detail-basic'>{stockSymbol.toUpperCase()} ({stockDetail.Exchange})</div>
        <div className='stock-detail-basic'>{stockDetail.Sector} | {stockDetail.Industry} | {stockDetail.Country}</div>
        <p>{stockDetail && stockDetail.Description}</p>
        <table className='stock-detail-table'>
          <tbody>
            <tr><td className='colSpan-2' colSpan={2}>Key stats</td></tr>
            <tr><td>Current Price: </td><td>{stockDetail.PriceToBookRatio}</td></tr>
            <tr><td>52 Wk High: </td><td>{stockDetail['52WeekHigh']}</td></tr>
            <tr><td>52 Wk Low: </td><td>{stockDetail['52WeekLow']}</td></tr>
            <tr><td>Float: </td><td style={{color:"red"}}>Has been removed from the API</td></tr>
            <tr><td>Market Cap: </td><td>{stockDetail.MarketCapitalization}</td></tr>
            <tr><td>Earnings Per Share: </td><td>{stockDetail.EPS}</td></tr>
          </tbody>
        </table>
      </div>
    )
    : (stockDetail && (
      <p className='errorTxt'>
        <span>{stockDetail.Note}</span>
      </p>
    ))
  )
}

export default StockDetail;