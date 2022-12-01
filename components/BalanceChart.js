import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const randomPoints = [
  [65, 59, 100, 80, 10, 56, 72, 45, 67, 55, 42],
  [10, 50, 30, 84, 38, 90, 42, 77, 100, 0, 100],
  [0, 59, 100, 80, 10, 56, 100, 0, 26, 23, 32],
  [100, 42, 77, 100, 0, 100, 72, 45, 67, 55, 42],
  [0, 100, 47, 19, 90, 34, 25, 65, 78, 0, 32],
];

const getRandomPoints = () => {
  const rndInt = Math.floor(Math.random() * 4) + 1;
  return randomPoints[rndInt];
};

const data = {
  labels: [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Noz",
    "Dec",
    "Jan",
  ],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#0052ff",
      borderColor: "#0052ff",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#0052ff",
      pointBackgroundColor: "#0052ff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#0052ff",
      pointHoverBorderColor: "#0052ff",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: getRandomPoints(),
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "#323546", // axis
        borderColor: "#61636e", // grid line
      },
    },
    y: {
      grid: {
        color: "#323546", // axis
        borderColor: "#61636e", // grid line
      },
    },
  },
};

const BalanceChart = () => {
  return <Line data={data} options={options} width={400} height={200} />;
};

export default BalanceChart;
