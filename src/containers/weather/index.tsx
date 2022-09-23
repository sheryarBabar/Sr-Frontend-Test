import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";
import { AppLoading } from "components";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AppWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position: any) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    loadData();
  }, [lat, long]);

  const loadData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
      );

      const data = await response.json();
      setWeatherData(Object.assign({}, data?.list?.map((el: any) => el.main.temp).slice(0, 30)));
    } catch (error: any) {
      console.log("unexpected error: ", error);
      toast.error(error.message);
    }
  };
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Weather Chart",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = ["temp"];

  const data: any = {
    labels,
    datasets: [
      {
        label: "temp",
        data: weatherData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "day",
        data: weatherData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  if (!weatherData) return <AppLoading />;
  return <>{weatherData && <Line options={options} data={data} />}</>;
};

export default AppWeather;
