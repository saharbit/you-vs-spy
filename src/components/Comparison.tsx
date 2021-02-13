import { useState } from "react";
import { PortfolioState } from "../App";
import API from "../services/API";
import { Duration } from "./RangePicker";

type Props = {
  portfolio: PortfolioState;
  range: Duration | null;
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

    return `/v8/finance/spark?symbols=${tickers}&interval=${
      range?.interval || "1mo"
    }&range=${range?.range || "3m"}`;
  }

  function setSPYChange(response: any) {
    const SPY_DATA = response.data["SPY"];
    const currentPrice = SPY_DATA.close[SPY_DATA.close.length - 1];
    const initialPrice = SPY_DATA.close[0];
    const SPY_PERCENTAGE = (
      ((currentPrice - initialPrice) / currentPrice) *
      100
    ).toFixed(2);
    setSpyChangePercentage(SPY_PERCENTAGE);
  }

  function setPortfolioChange(response: any) {
    Object.keys(portfolio).forEach((ticker) => {
      const DATA = response.data[ticker];
      const currentPrice = DATA.close[DATA.close.length - 1];
      const initialPrice = DATA.close[0];
      const CHANGE_PERCENTAGE = (
        ((currentPrice - initialPrice) / currentPrice) *
        100
      ).toFixed(2);
      setPortfolioChangePercentage(CHANGE_PERCENTAGE);
    });
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
        className="button-background rounded p-1 py-5 rounded-xl font-bold border border-black text-white w-full mb-5"
        onClick={onSubmit}
      >
        VS SPY
      </button>
      <div className="flex flex-row justify-evenly">
        {portfolioChangePercentage && (
          <div className="flex flex-col items-center">
            <div className="text-white">YOU</div>
            <div className="text-xl text-green-200 font-bold">
              {portfolioChangePercentage}%
            </div>
          </div>
        )}
        {spyChangePercentage && (
          <div className="flex flex-col items-center">
            <div className="text-white">SPY</div>
            <div className="text-xl text-green-200 font-bold">
              {spyChangePercentage}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
