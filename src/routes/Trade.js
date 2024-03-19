import { Col, Input, Row, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTicker } from "../clients/MarketClient";
import { useAuth } from "../util/AuthContext";
import TradeStock from "./TradeStock";
import WatchListButton from "../components/WatchListButton";
import AlertMap from "../components/feedback/AlertMap";
import stocksColumns from "../util/StocksTable";

const Trade = () => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [symbol, setSymbol] = useState(searchParams.get("symbol") || "all");
  // let [lastSeen, setLastNeed] = useState();

  const [symbolList, setSymbolList] = useState([]);
  const [messageState, setMessageState] = useState({ type: "", messages: [] });
  const [selectedSymbol, setSelectedSymbol] = useState({});

  const handleSearchedSymbol = async (symbolName) => {
    if (!symbolList) return;
    const existingSymbol = symbolList.filter(
      (sym) => sym.symbol === symbolName,
    );
    if (existingSymbol.length === 1) {
      setSelectedSymbol(existingSymbol[0]);
    } else {
      let tickerData = await getTicker(token, symbolName);
      if (tickerData.status === 200) {
        setSymbolList([...symbolList, tickerData.body.ticker]);
        setSelectedSymbol(tickerData.body.ticker);
      } else if (tickerData.status === 400) {
        setMessageState({ type: "warn", messages: tickerData.errors });
      }
    }
  };
  useEffect(() => {
    const searchSymbol = searchParams.get("symbol") || "all";
    if (searchSymbol !== "all") {
      handleSearchedSymbol(searchSymbol);
    }
    setSymbol(searchSymbol);
  }, [searchParams]);

  const getTickerData = async () => {
    console.log("getting TICKER: ", symbol);
    let tickerData = await getTicker(token, symbol);
    if (tickerData.status === 200) {
      setSymbolList(tickerData.body.tickers);
    } else if (tickerData.status === 400) {
      setMessageState({ type: "warn", messages: tickerData.errors });
    }
  };

  useEffect(() => {
    const sym = searchParams.get("symbol") || "all";
    if (sym === "all") getTickerData();
    else handleSearchedSymbol(sym);
  }, []);

  const searchStock = async (value, _e, info) => {
    setSearchParams({ symbol: value });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <h3 className="page-heading">
            Trade{" "}
            {symbol === "all" ? (
              "List"
            ) : (
              <Space direction="horizontal">
                <span>{symbol.toUpperCase()} </span>
                <WatchListButton symbol={symbol.toUpperCase()} />
              </Space>
            )}
          </h3>
        </Col>
      </Row>
      <Row className="mt-1 mb-1">
        <Col span={20} offset={2}>
          <Input.Search
            enterButton
            size="large"
            placeholder="Search stock symbol..."
            defaultValue={symbol === "all" ? "" : symbol}
            onSearch={searchStock}
          />
        </Col>
      </Row>
      <Row>
        <AlertMap messages={messageState.messages} type={messageState.type} />
      </Row>
      {symbol === "all" ? (
        <Row>
          <Col span={20} offset={2}>
            <Table
              style={{ width: "100%", cursor: "pointer" }}
              columns={stocksColumns}
              dataSource={symbolList}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    event.preventDefault();
                    setSearchParams({ symbol: record.symbol });
                  }, // click row
                };
              }}
            />
          </Col>
        </Row>
      ) : (
        symbolList && <TradeStock details={selectedSymbol} />
      )}
    </>
  );
};

export default Trade;
