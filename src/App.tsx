import { useState } from "react";
import API from "./API";
import "./App.css";
import DatePicker from "./DatePicker";
import Portfolio from "./Portfolio";

export type PortfolioState = {
  [ticker: string]: {
    weight: number;
    name: string;
  };
};

function App() {
  const [portfolio, setPortfolio] = useState<PortfolioState>({});

  async function onClick() {
    try {
      const tickers = `SPY,${Object.keys(portfolio).join(",")}`;
      const response = await API.get(
        `/v8/finance/spark?symbols=${tickers}&interval=1mo&range=3mo`
      );
      const SPY_DATA = response.data["SPY"];
      const currentPrice = SPY_DATA.close[SPY_DATA.close.length - 1];
      const initialPrice = SPY_DATA.close[0];
      const SPY_PERCENTAGE = (
        ((currentPrice - initialPrice) / currentPrice) *
        100
      ).toFixed(2);

      Object.keys(portfolio).forEach((ticker) => {
        const DATA = response.data[ticker];
        const currentPrice = DATA.close[DATA.close.length - 1];
        const initialPrice = DATA.close[0];
        const CHANGE_PERCENTAGE = (
          ((currentPrice - initialPrice) / currentPrice) *
          100
        ).toFixed(2);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="background min-h-screen p-5">
      <div className="max-w-screen-sm flex flex-col mx-auto">
        <Portfolio portfolio={portfolio} setPortfolio={setPortfolio} />
        <DatePicker />
        <button
          className="button-background rounded p-1 py-5 rounded-xl font-bold border border-black text-white"
          onClick={onClick}
        >
          VS SPY
        </button>
      </div>
    </div>
  );
}

export default App;
