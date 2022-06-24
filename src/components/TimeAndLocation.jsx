import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { formatToLocalTime } from "../../utils/weather";

const TimeAndLocation = ({ data: { dt, timezone, name, country } }) => {
	return (
		<Flex direction="column" align="center" mt="100px" color="white">
			<Text fontWeight="500" fontSize={["12pt", "17pt"]}>
				{formatToLocalTime(dt, timezone)}
			</Text>
			<Text fontSize="25pt" fontWeight="600">
				{name} , {country}
			</Text>
		</Flex>
	);
};

export default TimeAndLocation;
