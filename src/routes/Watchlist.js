import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  createWatchlistRequest,
  getWatchListRequest,
  removeTickerFromList,
} from "../clients/UserClient";
import { useAuth } from "../util/AuthContext";
import stocksColumns from "../util/StocksTable";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

const deleteTickerAction = (deleteMethod) => ({
  title: "Acton",
  dataIndex: "",
  key: "x",
  render: (text, record) => (
    <Typography.Text
      type="danger"
      onClick={(e) => {
        deleteMethod(e, record);
      }}
    >
      Remove
    </Typography.Text>
  ),
});

const WatchList = () => {
  const { token } = useAuth();
  const [watchLists, setWatchLists] = useState([]);
  const [selected, setSelected] = useState({});
  const watchlistNameRef = useRef();
  const getWatchLists = async () => {
    const response = await getWatchListRequest(token);
    if (response.status === 200) {
      setWatchLists(response.body.watchLists);
    }
  };

  const createWatchlist = async (e) => {
    e.preventDefault();
    const name = watchlistNameRef?.current?.input?.value;
    if (!name) {
      return;
    }
    let response = await createWatchlistRequest(token, name);
    if (response.status === 200) {
      getWatchLists();
    }
  };
  useEffect(() => {
    getWatchLists();
  }, []);

  const setSelectListByName = ({ name }) => {
    console.log("selecting ", name);
    const select = watchLists.filter((wl) => wl.name === name);
    console.log(select);
    setSelected(select[0] || {});
  };

  const removeFromList = async (e, record) => {
    e.preventDefault();
    console.log(selected.name, record.symbol);
    let response = await removeTickerFromList(
      token,
      selected.name,
      record.symbol,
    );
    if (response.status !== 200) {
      console.error(response.errors);
    } else {
      let newSymbols = selected.symbols.filter(
        (sym) => sym.symbol !== record.symbol,
      );
      console.log("HERE", newSymbols);
      setSelected({ ...selected, symbols: newSymbols });
    }
  };
  return (
    <>
      <Row>
        <h3 className="page-heading">Watchlist</h3>
      </Row>
      <Row>
        <h4 style={{ marginLeft: "4em" }}>Create new watchlist:</h4>
      </Row>
      <Row>
        <Col style={{ marginLeft: "4em" }} span={6}>
          <Space.Compact style={{ width: "100%" }}>
            <Input ref={watchlistNameRef} placeholder="Watchlist name" />
            <Button onClick={(e) => createWatchlist(e)} type="primary">
              Submit
            </Button>
          </Space.Compact>
        </Col>
      </Row>
      <Divider />
      {watchLists.length === 0 ? (
        <Row>
          <span style={{ marginLeft: "4em" }} className="mt-1">
            Create one above!
          </span>
        </Row>
      ) : (
        <Row style={{ height: "80vh" }}>
          <Col span={4} offset={1}>
            <Row>
              <h3>Your watchlists:</h3>
            </Row>
            <Row style={{ width: "100%" }}>
              <Table
                style={{ width: "100%" }}
                columns={columns}
                dataSource={watchLists}
                onRow={(record, index) => {
                  return {
                    onClick: (event) => {
                      event.preventDefault();
                      setSelectListByName({
                        name: record.name,
                      });
                    }, // click row
                  };
                }}
              />
            </Row>
          </Col>
          <Col span={16} offset={1}>
            {selected && selected?.symbols?.length > 0 && (
              <>
                <Row>
                  <h3>Watchlist '{selected.name}'</h3>
                </Row>
                <Row>
                  <Table
                    style={{ width: "100%" }}
                    columns={[
                      ...stocksColumns,
                      deleteTickerAction(removeFromList),
                    ]}
                    dataSource={selected.symbols}
                  />
                </Row>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default WatchList;
