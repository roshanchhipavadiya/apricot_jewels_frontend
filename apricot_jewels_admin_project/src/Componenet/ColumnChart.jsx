import React, { useMemo, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useGetAppoinmentQuery } from '../services/apiSlice';

const AppointmentBarChart = () => {
  const { data: appointments, isLoading } = useGetAppoinmentQuery();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Extract unique years from data
  const availableYears = useMemo(() => {
    if (!appointments?.data?.length) return [];
    const years = new Set(
      appointments.data.map((item) => new Date(item.appointment_date).getFullYear())
    );
    return [...years].sort();
  }, [appointments?.data]);

  // Process appointment data by day for selected year
  const chartData = useMemo(() => {
    if (!appointments?.data?.length) return { categories: [], data: [] };

    const countsByDate = {};

    appointments.data.forEach((item) => {
      const dateObj = new Date(item.appointment_date);
      const year = dateObj.getFullYear();
      if (year !== selectedYear) return;

      const label = dateObj.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      }); // e.g., "13 Jun"

      if (!countsByDate[label]) {
        countsByDate[label] = 0;
      }

      countsByDate[label] += 1;
    });

    const categories = Object.keys(countsByDate);
    const data = categories.map((label) => countsByDate[label]);

    return { categories, data };
  }, [appointments?.data, selectedYear]);

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#333',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#333',
          fontSize: '12px',
        },
      },
    },
    fill: { opacity: 1 },
    colors: ['#2275fc'],
    tooltip: {
      y: {
        formatter: (val) => `${val} appointments`,
      },
    },
    legend: { show: false },
  };

  const series = [
    {
      name: 'Appointments',
      data: chartData.data,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Appointments Overview
        </h2>
        {availableYears.length > 0 && (
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
      {isLoading ? (
        <p>Loading chart...</p>
      ) : (
        <ApexCharts options={options} series={series} type="bar" height={250} />
      )}
    </div>
  );
};

export default AppointmentBarChart;
