import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { iconUrlFromCode } from "../../utils/weather";

const Forecast = ({ text, items }) => {
	console.log({ items });
	return (
		<Flex direction="column" color="white" mt="10" mx={["0", "10"]}>
			<Text textTransform="uppercase" fontWeight="600">
				Dự báo thời tiết 5 {text} tới
			</Text>
			<Divider my="3" />
			<Flex justify="space-between">
				{items.map((item, _i) => (
					<Flex key={_i} direction="column" align="center" justify="center" gap="1" w="80px">
						<Text fontSize="10pt">{item.title}</Text>
						<Image alt="logo" src={iconUrlFromCode(item.icon)} w="8" />
						<Text fontSize="10pt" fontWeight="600">
							{item.temp.toFixed()}°
						</Text>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};

export default Forecast;
