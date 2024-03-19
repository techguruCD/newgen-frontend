import React from 'react'
import PortfolioStockSlab from './PortFolioStockSlab/index';
import {FaMoneyBillWave} from 'react-icons/fa'; //done
import './style.css'


function PortfolioStocksWindows({data, changeSymbl, setCurrPrice, buyOpen, sellOpen}) {
    
    console.log(data);
    const stockList = data.map((stock, index) => (
        <PortfolioStockSlab changeSymbl={changeSymbl} data={stock} setCurr={setCurrPrice} buyOpen={buyOpen} sellOpen={sellOpen} key={index} />
    ))
    return (
        <div className="portfolioStocksWindows">
            <div className="portfolioStocks_header">YOUR STOCKS</div>
            <div className="portfolioStocks_stockList">
                {data.length > 0 ? (stockList) : (
                    <div className="nostocksmessage">
                    <FaMoneyBillWave />
                    Buy some Stocks
                    </div>
                )}
            </div>
            <div className="divFill">.</div>
        </div>
    )
}


export default PortfolioStocksWindows