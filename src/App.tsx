import { useState } from "react";
import RangePicker, { Duration, DURATIONS } from "./components/RangePicker";
import Portfolio from "./components/Portfolio";
import Comparison from "./components/Comparison";
import "./App.css";

export type PortfolioState = {
  [ticker: string]: {
    weight: string;
    name: string;
  };
};

function App() {
  const [portfolio, setPortfolio] = useState<PortfolioState>({});
  const [range, setRange] = useState<Duration>(DURATIONS[0]);

  return (
    <div className="background min-h-screen p-5">
      <div className="max-w-screen-sm flex flex-col mx-auto">
        <Portfolio portfolio={portfolio} setPortfolio={setPortfolio} />
        <RangePicker range={range} setRange={setRange} />
        <Comparison portfolio={portfolio} range={range} />
      </div>
    </div>
  );
}

export default App;
