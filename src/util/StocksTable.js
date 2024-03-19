import { Link } from "react-router-dom";

const formatNumber = (number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  }).format(number);
};

const stocksColumns = [
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (text) => (
      <Link to={"/trade?symbol=" + text}>
        <a>{text.toUpperCase()}</a>
      </Link>
    ),
  },
  {
    title: "Name",
    dataIndex: "longName",
    key: "name",
  },
  {
    title: "Open",
    dataIndex: "summary",
    key: "open",
    render: (summary) => <p>${summary?.open.toFixed(2)}</p>,
  },

  {
    title: "24h High",
    dataIndex: "summary",
    key: "dayHigh",
    render: (summary) => <p>${summary.dayHigh.toFixed(2)}</p>,
  },

  {
    title: "24h Low",
    dataIndex: "summary",
    key: "dayLow",
    render: (summary) => <p>${summary.dayLow.toFixed(2)}</p>,
  },
  {
    title: "Market Cap",
    dataIndex: "summary",
    key: "marketCap",
    render: (summary) => <p>${formatNumber(summary.marketCap)}</p>,
  },
];

export default stocksColumns;

export {formatNumber}