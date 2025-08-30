import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SalesRangeFilter() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleFilter = () => {
    console.log(
      "Filter sales from:",
      range[0].startDate,
      "to:",
      range[0].endDate
    );
  };

  return (
    <div className="w-[350px] max-w-full bg-white rounded-2xl shadow-lg p-1">
      <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-[#ff7a00] text-lg">📅</span>
        Filter Sales by Date Range
      </h4>

      <div className=" rounded-xl shadow-sm overflow-hidden">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
          rangeColors={["#ff7a00"]}
          className="w-full"
          style={{ width: "100%" }} // ensure calendar resizes inside modal
        />
      </div>

      <button
        onClick={handleFilter}
        className="mt-4 w-full px-4 py-2.5 text-sm font-medium bg-[#ff7a00] text-white rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200"
      >
        Apply Filter
      </button>
    </div>
  );
}
