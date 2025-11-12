import React from "react";
import Chart from "react-apexcharts";

const MiniAreaChart = ({ color = "#22C55E", gradientTo = "#91E2AF" }) => {
    const series = [
        {
            name: "Sales",
            data: [0, 12.5, 23.25, 0, 17.5, 5, 12],
        },
    ];

    const options = {
        chart: {
            type: "area",
            height: 60,
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
            colors: [color],
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.65,
                opacityTo: 0.5,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: color,
                        opacity: 0.65,
                    },
                    {
                        offset: 100,
                        color: gradientTo,
                        opacity: 0.5,
                    },
                ],
            },
        },
        tooltip: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
    };

    return (
        <div style={{ width: "100%" }}>
            <Chart
                options={options}
                series={series}
                type="area"
                height={60}
                width="100%" // you can try setting this if not behaving responsively
            />
        </div>

    );
};

export default MiniAreaChart;
