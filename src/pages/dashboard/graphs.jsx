import React from "react";
import { StyledGraphs } from "./style";
import ReactECharts from "echarts-for-react";
import { customColors } from "theme/pallete";

const incidentOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    top: "bottom",
    textStyle: {
      fontSize: 9,
      fontWeight: 400,
      fontFamily: "Inter",
      color: "rgba(0, 0, 0, 0.60)",
    },
  },
  grid: {
    top: "1%",
    left: "2%",
    right: "5%",
    height: "80%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    axisLabel: {
      textStyle: {
        fontSize: 12,
        fontWeight: 400,
        fontFamily: "Inter",
        color: customColors.text,
      },
    },
  },
  yAxis: {
    type: "category",
    data: ["SFS", "LGB", "LAX"],
    axisLabel: {
      textStyle: {
        fontSize: 10,
        fontWeight: 400,
        fontFamily: "Inter",
        color: customColors.text,
      },
    },
  },
  series: [
    {
      type: "bar",
      stack: "total",
      data: [18, 13, 18],
      name: "Investigation",
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 0.4)" },
    },
    {
      type: "bar",
      stack: "total",
      name: "Review",
      data: [26, 29, 26],
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 0.75)" },
    },
    {
      type: "bar",
      stack: "total",
      data: [45, 0, 40],
      name: "Pending Course",
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 1)" },
    },
  ],
};

const actionOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    top: "bottom",
    textStyle: {
      fontSize: 9,
      fontWeight: 400,
      fontFamily: "Inter",
      color: "rgba(0, 0, 0, 0.60)",
    },
  },
  grid: {
    top: "1%",
    left: "2%",
    right: "5%",
    height: "80%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    axisLabel: {
      textStyle: {
        fontSize: 12,
        fontWeight: 400,
        fontFamily: "Inter",
        color: customColors.text,
      },
    },
  },
  yAxis: {
    type: "category",
    data: ["SFS", "LGB", "LAX"],
    axisLabel: {
      textStyle: {
        fontSize: 10,
        fontWeight: 400,
        fontFamily: "Inter",
        color: customColors.text,
      },
    },
  },
  series: [
    {
      type: "bar",
      stack: "total",
      name: "Not Started",
      data: [110, 120, 150],
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 0.2)" },
    },
    {
      type: "bar",
      stack: "total",
      name: "Completed",
      data: [290, 250, 270],
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 0.35)" },
    },
    {
      type: "bar",
      stack: "total",
      name: "Delayed",
      data: [350, 330, 350],
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 0.6)" },
    },
    {
      type: "bar",
      stack: "total",
      name: "In Progress",
      emphasis: { focus: "series" },
      data: [400, 400, 450],
      itemStyle: { color: "rgba(0, 122, 90, 0.8)" },
    },
    {
      type: "bar",
      stack: "total",
      name: "Closed",
      data: [490, 0, 0],
      emphasis: { focus: "series" },
      itemStyle: { color: "rgba(0, 122, 90, 1)" },
    },
  ],
};

const Graphs = () => {
  return (
    <StyledGraphs>
      <div className="graph">
        <h2>Current Incidents By Status</h2>
        <ReactECharts option={incidentOption} />
      </div>
      <div className="graph">
        <h2>Current Action By Status</h2>
        <ReactECharts option={actionOption} />
      </div>
    </StyledGraphs>
  );
};

export default Graphs;
