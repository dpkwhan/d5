import React, { memo, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import elementResizeEvent, { unbind } from "element-resize-event";
import { useDidUpdate } from "@/hooks";

const ReactEcharts = memo(
  ({
    echarts,
    option,
    theme = "default",
    notMerge = false,
    lazyUpdate = false,
    loadingOption = null,
    showLoading = false,
    events = null,
    onChartReady,
    opts,
    className,
    style
  }) => {
    const echartDOM = useRef(null);
    const klassName = className
      ? `react-echarts ${className}`
      : "react-echarts";

    const dispose = useCallback(() => {
      if (echartDOM.current) {
        try {
          unbind(echartDOM.current);
        } catch (error) {
          // console.warn(error);
        }
        echarts.dispose(echartDOM.current);
        echartDOM.current = null;
      }
    }, [echarts, echartDOM]);

    const renderChart = useCallback(() => {
      let echartInstance = echarts.getInstanceByDom(echartDOM.current);
      if (!echartInstance) {
        // Re-create the echart instance if it does not exist
        echartInstance = echarts.init(echartDOM.current, theme, opts);
        elementResizeEvent(
          echartDOM.current,
          debounce(
            () => {
              echartInstance.resize();
            },
            100,
            { leading: true }
          )
        );

        if (typeof onChartReady === "function") {
          onChartReady(echartInstance);
        }
      }

      if (events && Array.isArray(events)) {
        // Unbind events
        events.forEach(({ eventName, query, handler, context }) => {
          echartInstance.off(eventName);
        });
      }
      // Show loading if requested
      if (showLoading) {
        echartInstance.showLoading("default", loadingOption);
      } else {
        echartInstance.clear();
        echartInstance.hideLoading();
        echartInstance.setOption(option, true);
        if (events && Array.isArray(events)) {
          // Bind events
          events.forEach(({ eventName, query, handler, context }) => {
            echartInstance.on(eventName, query, handler, context);
          });
        }
      }
    }, [
      option,
      echarts,
      theme,
      notMerge,
      lazyUpdate,
      opts,
      events,
      loadingOption,
      showLoading,
      echartDOM
    ]);

    // did mount and will unmount
    useEffect(() => {
      renderChart();
      return () => {
        dispose();
      };
    }, []);

    // did update on theme
    useDidUpdate(() => {
      dispose();
      renderChart();
    }, [theme]);

    // did update on option
    useDidUpdate(() => {
      renderChart();
    }, [option]);

    // Resize after styles are updated
    useDidUpdate(() => {
      const echartInstance = echarts.getInstanceByDom(echartDOM.current);
      try {
        echartInstance.resize();
      } catch (error) {
        // console.warn(error);
      }
    }, [className, style, echartDOM, echarts]);

    return (
      <div
        ref={echartDOM}
        className={klassName}
        style={{
          position: "relative",
          height: 400,
          ...style
        }}
      />
    );
  }
);

ReactEcharts.propTypes = {
  echarts: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  opts: PropTypes.shape({
    devicePixelRatio: PropTypes.number,
    renderer: PropTypes.oneOf(["canvas", "svg"]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, "auto"])
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, "auto"])
    ])
  }),
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showLoading: PropTypes.bool,
  loadingOption: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  events: PropTypes.array,
  onChartReady: PropTypes.func
};

export default ReactEcharts;
