import {
  axisBottom,
  axisLeft,
  max,
  min,
  ScaleBand,
  scaleBand,
  scaleLinear,
  ScaleLinear,
  select,
} from "d3";
import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import {
  ChartSettingsInterface,
  NocSettingsInterface,
  ProvinceSettingsInterface,
  useSettingsContext,
} from "../lib/SettingsContext";
import jobData from "../data/jobdata.json";
import Province from "./CanadaMap/Province";
import { ProvinceCustomizations } from "./CanadaMap/Canada";
import { ProvinceOptionType, YearOptions } from "../lib/Options";
import { JobDataInterface } from "../data/jobdataInterface";

interface Data {
  label: string;
  value: number;
}

interface BarChartProps {
  data: Data[];
}

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({
  data,
  height,
  scaleX,
  scaleY,
}: {
  data: BarChartProps["data"];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
}) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(Math.max(0, value))}
          width={scaleX.bandwidth()}
          height={Math.abs(scaleY(value) - scaleY(0))}
          fill={value > 0 ? "#2c7bb6" : "#d7191c"}
        />
      ))}
    </>
  );
}

const Chart = ({
  chartSettings,
}: {
  chartSettings: ChartSettingsInterface;
}) => {
  const { yearSettings, nocSettings } = useSettingsContext();
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const data: Data[] = useMemo(() => {
    const newData: Data[] = [];
    const provinceData = (jobData as unknown as JobDataInterface)[
      chartSettings.provinceSettings.value as ProvinceOptionType
    ];
    const filteredJobData = provinceData
      .filter((data) => {
        return data.occupation === nocSettings.value;
      })
      .sort((a, b) => {
        return parseInt(a.year) - parseInt(b.year);
      });

    for (let i = 0; i < filteredJobData.length; i++) {
      const year = filteredJobData[i].year;
      let val = 0;

      if (
        !(
          parseInt(year) >= yearSettings.yearSettingsStart.value &&
          parseInt(year) <= yearSettings.yearSettingsEnd.value
        )
      )
        continue;

      // cannot compare to previous year since it doesn't exist
      if (year !== YearOptions[0].toString()) {
        const { value: currValue } = filteredJobData[i];
        const { value: prevValue } = filteredJobData[i - 1];

        val = parseFloat(currValue) - parseFloat(prevValue);
      }

      newData.push({
        label: year,
        value: val,
      });
    }

    return newData;
  }, [
    yearSettings.yearSettingsStart,
    yearSettings.yearSettingsEnd,
    chartSettings.provinceSettings.value,
    nocSettings.value,
  ]);

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([
      min(data, function (d) {
        return d.value;
      }) ?? 0,
      max(data, function (d) {
        return d.value;
      }) ?? 0,
    ])
    .range([height, 0]);

  return (
    <div className="flex flex-row" id="chart">
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
          <AxisLeft scale={scaleY} />
          <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
        </g>
      </svg>
    </div>
  );
};

export default Chart;
