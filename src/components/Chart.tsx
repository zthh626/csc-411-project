import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  scaleLinear,
  ScaleLinear,
  select,
} from "d3";
import * as React from "react";
import { useEffect, useRef } from "react";
import { YearOptions } from "../lib/Options";

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
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="teal"
        />
      ))}
    </>
  );
}

const Chart: React.FunctionComponent = () => {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const data: Data[] = [];

  YearOptions.forEach((year) => {
    data.push({
      label: year,
      value: Math.floor(Math.random() * 1000),
    });
  });

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  return (
    <div id="chart">
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
