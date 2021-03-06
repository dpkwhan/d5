import React from 'react';
import { echarts, loadingOption, ReactEcharts } from '../base';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

const Bar = ({ option, className, style, loading }) => {
  const options = {
    title: option.title,
    tooltip: option.tooltip,
    legend: option.legend,
    toolbox: option.toolbox || {
      feature: {
        dataView: { readOnly: true },
        magicType: {
          type: ['line', 'bar'],
        },
        restore: {},
        saveAsImage: {
          pixelRatio: 2,
        },
      },
      right: '3.5%',
    },
    grid: Object.assign(
      {},
      {
        left: '4%',
        right: '4%',
        containLabel: true,
      },
      option.grid,
    ),
    xAxis: option.xAxis,
    yAxis: option.yAxis,
    series: option.series,
  };
  return (
    <ReactEcharts
      className={className}
      style={style}
      echarts={echarts}
      option={options}
      notMerge
      lazyUpdate
      loadingOption={loadingOption}
      showLoading={loading}
    />
  );
};

export default Bar;
