import React from "react";
import BuyFormContainer from "./BuyFormContainer";
import MyStocks from "./MyStocks";

export default function Profilio() {
  return (
    <div >
      <div class="stock-row">
        <MyStocks />
      </div>
      <div class="buy-form-container">
        <BuyFormContainer />
      </div>
    </div>
  );
}
