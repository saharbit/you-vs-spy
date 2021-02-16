import Select from "react-select";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import API from "../../services/API";
import { PortfolioState } from "../../App";
import { customStyles } from "./customStyles";
import Placeholder from "./Placeholder";

type Props = {
  setPortfolio: (portfolio: PortfolioState) => void;
  portfolio: PortfolioState;
};

export default function SymbolSearch({ setPortfolio, portfolio }: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [symbolOptions, setSymbolOptions] = useState([]);

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
    <Select
      components={{ Placeholder }}
      styles={customStyles}
      onInputChange={setSearch}
      inputValue={search}
      options={symbolOptions}
      onChange={(option: any) => {
        setSymbolOptions([]);
        const ticker = option.value;
        const name = option.name;
        setPortfolio({ ...portfolio, [ticker]: { name, weight: "0" } });
      }}
      value={null}
      placeholder="Search symbol"
      isLoading={isSearching}
      className="mb-3"
    />
  );
}
