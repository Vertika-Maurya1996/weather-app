// WeatherTemperatureGraph.js

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WeatherTemperatureGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
let actualData = data[0]
let minTemp = actualData?.min;
let maxTemp = actualData?.max;
let date= actualData?.tempDate;
  useEffect(() => {
    // Destroy existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: date.map((entry) => {
            let formattedDate = new Date(entry).getDate();
            return formattedDate
            
          }),
          datasets: [
            {
              label: 'MinTemp',
              showLine:'false',
              data: minTemp.map((item) => item),
              fill: true,
              backgroundColor:'rgba(255, 137, 0, 1)',
              borderColor: 'transparent',
              cubicInterpolationMode:'monotone',
              pointStyle:false,
              
            },
            {
                label: 'MaxTemp',
                data: maxTemp.map((entry) => entry),
                fill: true,
                showLine:'false',
                backgroundColor:'rgba(255, 217, 177, 1)',
                borderColor: 'transparent',
                cubicInterpolationMode:'monotone',
                pointStyle:false,
              },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°C)',
              },
            },
            
          },
        },
      });
    }

    // Cleanup: destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default WeatherTemperatureGraph;
