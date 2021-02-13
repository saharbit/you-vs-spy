import { useState } from "react";
import RangePicker, { Duration } from "./components/RangePicker";
import Portfolio from "./components/Portfolio";
import Comparison from "./components/Comparison";
import "./App.css";

export type PortfolioState = {
  [ticker: string]: {
    weight: number;
    name: string;
  };
};

function App() {
  const [portfolio, setPortfolio] = useState<PortfolioState>({});
  const [range, setRange] = useState<Duration | null>(null);

  return (
    <div className="background min-h-screen p-5">
      <div className="max-w-screen-sm flex flex-col mx-auto">
        <Portfolio portfolio={portfolio} setPortfolio={setPortfolio} />
        <RangePicker range={range} setRange={setRange} />
        <Comparison portfolio={portfolio} range={range}/>
      </div>
    </div>
  );
}

export default App;
