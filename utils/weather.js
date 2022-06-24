import { DateTime } from "luxon";

const baseUrl = "https://api.openweathermap.org/data/2.5";

const getWeather = async (info, searchParams) => {
	const url = new URL(baseUrl + "/" + info);
	url.search = new URLSearchParams({ ...searchParams, appid: process.env.NEXT_PUBLIC_API_KEY });

	return fetch(url).then((res) => res.json());
};

//Format Current
const formatCurrentWeather = (data) => {
	const {
		coord: { lat, lon },
		main: { temp, feels_like, temp_min, temp_max, humidity },
		name,
		dt,
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed },
	} = data;

	const { main: details, icon } = weather[0];

	return {
		lat,
		lon,
		temp,
		feels_like,
		temp_min,
		temp_max,
		humidity,
		name,
		dt,
		country,
		sunrise,
		sunset,
		details,
		icon,
		speed,
	};
};

//format time
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Giờ địa phương: 'hh:mm a") =>
	DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Format Forecast weather
const formatForecastWeather = (data) => {
	let { timezone, daily, hourly } = data;
	daily = daily.slice(1, 6).map((d) => {
		return {
			title: formatToLocalTime(d.dt, timezone, "ccc"),
			temp: d.temp.day,
			icon: d.weather[0].icon,
		};
	});

	hourly = hourly.slice(1, 6).map((d) => {
		return {
			title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
			temp: d.temp,
			icon: d.weather[0].icon,
		};
	});

	return { timezone, daily, hourly };
};

// Get Formatted weather Data
export const getFormattedWeatherData = async (searchParams) => {
	const formattedCurrentWeather = await getWeather("weather", searchParams).then(formatCurrentWeather);
	const { lat, lon } = formattedCurrentWeather;

	const formattedForecastWeather = await getWeather("onecall", {
		lat,
		lon,
		exclude: "current,minutely,alerts",
		units: searchParams.units,
	}).then(formatForecastWeather);

	return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

//icon
const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };
