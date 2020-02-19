import React, { useEffect, useState } from "react";
import TransCard from "../components/TransCard";
import { BACKENDAPI } from "../constants";
import { connect } from "react-redux";

function MyStocks(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStocks();
    setInterval(() => {
      fetchStocks();
    }, 2000);
  }, []);

  function handleSetTotal(data) {
    let current = 0;
    Object.keys(data).map(stockKey => {
      current += data[stockKey].total;
    });
    props.dispatch({ type: "TOTAL", total: current });
  }

  const fetchStocks = () => {
    if (props.user) {
      fetch(BACKENDAPI + `/users/profilio/${props.user}`)
        .then(resp => resp.json())
        .then(data => {
          if (Object.entries(data).length > 0) {
            handleSetTotal(data);
            setLoading(false)
            props.dispatch({ type: "STOCKS", stocks: data });
          }
        });
    }
  };

  const renderStocks = () => {
    return Object.keys(props.stocks).map(stockKey => {
      return (
        <TransCard transaction={props.stocks[stockKey]} stockKey={stockKey} />
      );
    });
  };

  return (
    <div>
      <h1>Portfolio ${props.total}</h1>
      <h3>
        {loading ? "Trying to retrieve the stocks data. Please wait..." : null}
      </h3>
      <div class="transactions-box">{renderStocks()}</div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user,
    stocks: state.stocks,
    total: state.total
  };
};
export default connect(mapStateToProps)(MyStocks);
