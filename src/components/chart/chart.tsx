import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Chart = (props: any) => {
  let categoryTitle =
    props.chartData[0].category.at(0).toUpperCase() +
    props.chartData[0].category.slice(1);

  let categories = [];
  let prices = [];

  props.chartData.forEach((data) => {
    categories.push(data.title);
    prices.push(data.price);
  });

  const options: any = {
    chart: {
      type: "column",
    },
    title: {
      text: "Products in selected category",
      align: "left",
    },

    xAxis: {
      categories: categories,
      crosshair: true,
      accessibility: {
        description: "Categories",
      },
    },
    yAxis: {
      title: {
        text: categoryTitle,
      },
    },
    tooltip: {
      valueSuffix: " (1000 MT)",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "",
        data: prices,
      },
    ],
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
