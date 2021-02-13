import { useEffect, useState } from "react";
import Select from "react-select";
import { useDebounce } from "use-debounce";
import { PortfolioState } from "./App";
import API from "./API";

type Props = {
  setPortfolio: (portfolio: PortfolioState) => void;
  portfolio: PortfolioState;
};

export default function Portfolio({ portfolio, setPortfolio }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getAutocompleteItems = async () => {
      setIsSearching(true);
      try {
        const response = await API.get(
          `/v6/finance/autocomplete?query=${debouncedSearch}&lang=en`
        );
        const results = response.data.ResultSet.Result.map((quote: any) => ({
          value: quote.symbol,
          label: `${quote.symbol} ${quote.name ? `- ${quote.name}` : ""}`,
          name: quote.name,
        }));
        setSymbolOptions(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    };

    if (debouncedSearch) {
      getAutocompleteItems();
    }
  }, [debouncedSearch]);

  return (
    <div className="portfolio-background p-4 rounded-xl mb-5">
      <div className="text-lg font-bold mb-4 text-white">My portfolio</div>
      <Select
        onInputChange={setSearch}
        inputValue={search}
        options={symbolOptions}
        onChange={(option: any) => {
          setSymbolOptions([]);
          const ticker = option.value;
          const name = option.name;
          setPortfolio({ ...portfolio, [ticker]: { name, weight: 0 } });
        }}
        value={null}
        placeholder="Add symbol"
        isLoading={isSearching}
        className="mb-4"
      />
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
              <div className="font-bold text-white">%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
