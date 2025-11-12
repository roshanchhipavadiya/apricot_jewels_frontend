// AreaChart.js
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useGetOrderQuery } from '../services/apiSlice';

const AreaChart = () => {
  const { data: order } = useGetOrderQuery();

  // Count orders by month (assuming each order has a "created_at" or "date" field)
  const ordersByMonth = useMemo(() => {
    const counts = Array(12).fill(0); // Jan to Dec
    if (order?.data?.length) {
      order.data.forEach((item) => {
        const date = new Date(item.created_at || item.date); // adjust key as per your API
        const monthIndex = date.getMonth(); // 0-11
        counts[monthIndex]++;
      });
    }
    return counts.slice(0, 9); // For Jan–Sep (as per your x-axis)
  }, [order]);

  const series = [
    {
      name: 'Sales',
      data: ordersByMonth.length ? ordersByMonth : [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    colors: ['#2275fc'],
    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <div className="w-full mx-auto">
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
};

export default AreaChart;
