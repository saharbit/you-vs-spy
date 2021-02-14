import { PortfolioState } from "../App";
import SymbolAutocomplete from "./SymbolAutocomplete";

type Props = {
  setPortfolio: (portfolio: PortfolioState) => void;
  portfolio: PortfolioState;
};

export default function Portfolio({ portfolio, setPortfolio }: Props) {
  return (
    <div className="portfolio-background p-4 rounded-xl mb-5">
      <div className="text-lg font-bold mb-4 text-white">My portfolio</div>
      <SymbolAutocomplete portfolio={portfolio} setPortfolio={setPortfolio} />
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
                className="rounded p-1 mr-2 input-background text-white w-12"
                type="number"
                value={weight.toString()}
                onChange={(e) => {
                  const weight = parseInt(e.target.value, 10);

                  setPortfolio({
                    ...portfolio,
                    [ticker]: { ...portfolio[ticker], weight },
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
