import { PortfolioState } from "../App";
import SymbolSearch from "./SymbolSearch/SymbolSearch";
import { useState } from "react";

type Props = {
  setPortfolio: (portfolio: PortfolioState) => void;
  portfolio: PortfolioState;
};

export default function Portfolio({ portfolio, setPortfolio }: Props) {
  const [weightInputValue, setWeightInputValue] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  return (
    <div className="portfolio-background p-4 rounded-xl mb-5 shadow-xl">
      <div className="text-lg font-bold mb-4 text-white">My portfolio</div>
      <SymbolSearch portfolio={portfolio} setPortfolio={setPortfolio} />
      <div>
        {Object.entries(portfolio).map(([ticker, { weight, name }]) => (
          <div
            className="flex flex-row items-center justify-between py-2"
            key={ticker}
          >
            <div>
              <div className="text-white">{ticker}</div>
              <div className="text-white text-xs text-gray-500">{name}</div>
            </div>
            <div className="flex flex-row items-center">
              <input
                className="rounded-xl p-2 mr-2 input-background text-white w-12"
                type="number"
                value={focusedInput === ticker ? weightInputValue : weight}
                onBlur={() => setFocusedInput(null)}
                onFocus={() => {
                  setFocusedInput(ticker);
                  setWeightInputValue("");
                }}
                onChange={(e) => {
                  const weight = e.target.value;
                  setWeightInputValue(weight);
                  
                  setPortfolio({
                    ...portfolio,
                    [ticker]: { ...portfolio[ticker], weight }
                  });
                }}
              />
              <div className="font-bold text-sm text-white">%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
