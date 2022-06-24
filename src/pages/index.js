import { Box, Center, Container } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getFormattedWeatherData } from "../../utils/weather";
import Forecast from "../components/Forecast";
import Inputs from "../components/Inputs";
import TemparatureAndDetail from "../components/TemparatureAndDetail";
import TimeAndLocation from "../components/TimeAndLocation";
import TopButton from "../components/TopButton";

export default function Home() {
	const [query, setQuery] = useState({ q: "london" });
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState();

	// console.log({ weather });

	useEffect(() => {
		const fetchWeather = async () => {
			const messsage = query.q ? query.q : "Vị trí hiện tại.";

			toast.info("Đang cập nhập thời tiết cho " + messsage.toLocaleUpperCase());

			await getFormattedWeatherData({ ...query, units }).then((data) => {
				toast.success(`Đã hoàn thành cập nhập thời tiết cho ${data.name}, ${data.country} `);
				setWeather(data);
			});
		};
		fetchWeather();
	}, [query, units]);

	const formatBackground = () => {
		if (!weather) return "linear(to-br,cyan.700,blue.700)";
		const nhietdo = units === "metric" ? 30 : 60;
		if (weather.temp <= nhietdo) return "linear(to-br,cyan.700,blue.700)";

		return "linear(to-br,yellow.700,orange.700)";
	};

	return (
		<>
			<Head>
				<title>Dự báo thời tiết</title>
				<meta name="description" content="Made by Khoa" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container maxW="container.lg" shadow="xl" py="5" bgGradient={`${formatBackground()}`}>
				<TopButton setCity={setQuery} />
				<Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
				{!weather ? (
					<Center my="300px">
						<Rings ariaLabel="loading-indicator" color="orange" height={200} width={400} />
					</Center>
				) : (
					<>
						<TimeAndLocation data={weather} />
						<TemparatureAndDetail data={weather} />
						<Box mt="100px" mb="200px">
							<Forecast text="Giờ" items={weather.hourly} />
							<Forecast text="Ngày" items={weather.daily} />
						</Box>
					</>
				)}
			</Container>
			<ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
		</>
	);
}
