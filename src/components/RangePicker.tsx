const DURATIONS = [
  { range: "1d", interval: "1d" },
  { range: "5d", interval: "1d" },
  { range: "3mo", interval: "1mo" },
  { range: "6mo", interval: "1mo" },
  { range: "1y", interval: "1mo" },
  { range: "5y", interval: "1mo" },
];

export type Duration = {
  range: string;
  interval: string;
};

type Props = {
  range: Duration | null;
  setRange: (range: Duration) => void;
};

export default function RangePicker({ range, setRange }: Props) {
  return (
    <div className="portfolio-background p-4 rounded-xl mb-5">
      <div className="text-lg font-bold mb-4 text-white">Range</div>
      <div className="flex flex-row">
        {DURATIONS.map((duration) => {
          const isSelected = duration.range === range?.range;

          return (
            <div
              onClick={() => setRange(duration)}
              className={`text-white py-1 px-2 border border-white rounded-xl mr-2 ${
                isSelected ? "button-background" : "cursor-pointer"
              }`}
            >
              {duration.range}
            </div>
          );
        })}
      </div>
    </div>
  );
}
