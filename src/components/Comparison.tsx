import { useState } from "react";
import { PortfolioState } from "../App";
import API from "../services/API";
import { Duration } from "./RangePicker";

type Props = {
  portfolio: PortfolioState;
  range: Duration;
};

export default function Comparison({ portfolio, range }: Props) {
  const [spyChangePercentage, setSpyChangePercentage] = useState<string | null>(
    null
  );
  const [portfolioChangePercentage, setPortfolioChangePercentage] = useState<
    string | null
  >(null);

  function getURL(): string {
    const tickers = `SPY,${Object.keys(portfolio).join(",")}`;
    return `/v8/finance/spark?symbols=${tickers}&interval=${range.interval}&range=${range.range}`;
  }

  function setSPYChange(response: any) {
    const data = response.data["SPY"];
    const currentPrice = data.close[data.close.length - 1];
    const initialPrice = data.close[0];
    const changePercentage =
      ((currentPrice - initialPrice) / initialPrice) * 100;
    setSpyChangePercentage(changePercentage.toFixed(2));
  }

  function setPortfolioChange(response: any) {
    let changePercentage = 0;

    Object.keys(portfolio).forEach((ticker) => {
      const data = response.data[ticker];
      const currentPrice = data.close[data.close.length - 1];
      const initialPrice = data.close[0];
      const tickerWeight = Number(portfolio[ticker].weight) / 100;
      const tickerChange =
        ((currentPrice - initialPrice) / initialPrice) * 100 * tickerWeight;
      changePercentage = changePercentage + tickerChange;
    });
    setPortfolioChangePercentage(changePercentage.toFixed(2));
  }

  async function onSubmit() {
    try {
      const URL = getURL();
      const response = await API.get(URL);
      setSPYChange(response);
      setPortfolioChange(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      <button
        className="button-background rounded p-1 py-5 rounded-xl font-bold border border-black text-white w-full mb-8 shadow-xl"
        onClick={onSubmit}
      >
        VS SPY
      </button>
      <div className="flex flex-row justify-evenly items-center">
        {portfolioChangePercentage && (
          <div className="flex flex-col items-center">
            <div className="text-white text-lg">YOU</div>
            <div
              className={`text-2xl font-bold ${
                Number(portfolioChangePercentage) > 0
                  ? "text-green-300"
                  : "text-red-300"
              }`}
            >
              {portfolioChangePercentage}
              <span className="text-sm">%</span>
            </div>
          </div>
        )}
        {portfolioChangePercentage && spyChangePercentage && (
          <div className="text-white">VS</div>
        )}
        {spyChangePercentage && (
          <div className="flex flex-col items-center">
            <div className="text-white text-lg">SPY</div>
            <div
              className={`text-2xl font-bold ${
                Number(spyChangePercentage) > 0
                  ? "text-green-300"
                  : "text-red-300"
              }`}
            >
              {spyChangePercentage}
              <span className="text-sm">%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
