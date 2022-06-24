import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { SiWindicss } from "react-icons/si";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

import { formatToLocalTime, iconUrlFromCode } from "../../utils/weather";

const TemparatureAndDetail = ({
	data: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone },
}) => {
	return (
		<Flex direction="column" align="center" color="gray.100" gap="10" mt="80px">
			<Text fontSize="35pt" fontFamily="cursive" fontWeight="600" mr={["0px", "70px"]}>
				{details}
			</Text>
			<Flex justify="space-evenly" w="100%" align="center" gap="5" px={["0", "70px"]} direction={["column", "row"]}>
				<Image alt="logo" src={iconUrlFromCode(icon)} w="13" />
				<Text fontSize="35pt" fontWeight="700">
					{temp.toFixed()}°
				</Text>
				<Flex direction="column" gap="2">
					<Flex gap="2">
						<FaTemperatureHigh />
						<Text fontSize="10pt">Cảm giác như: {feels_like.toFixed()}°</Text>
					</Flex>
					<Flex gap="2">
						<MdOutlineWaterDrop />
						<Text fontSize="10pt">Độ ẩm: {humidity}%</Text>
					</Flex>
					<Flex gap="2">
						<SiWindicss />
						<Text fontSize="10pt">Tốc độ gió: {speed} km/h</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction={{ base: "column", md: "row" }} align="center" justify="center" gap={{ base: "1", md: "10" }} w="100%">
				<Flex gap="1" align="center">
					<BsFillSunriseFill />
					<Text>Bình minh: {formatToLocalTime(sunrise, timezone, "hh:mm a")} </Text>
				</Flex>

				<Flex gap="1" align="center">
					<BsFillSunsetFill />
					<Text>Hoàng hôn: {formatToLocalTime(sunset, timezone, "hh:mm a")}</Text>
				</Flex>

				<Flex gap="1" align="center">
					<AiOutlineArrowUp />
					<Text>Cao nhất: {temp_max.toFixed()}°</Text>
				</Flex>

				<Flex gap="1" align="center">
					<AiOutlineArrowDown />
					<Text>Thấp nhất: {temp_min.toFixed()}°</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default TemparatureAndDetail;
