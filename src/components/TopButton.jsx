import { Button, Flex } from "@chakra-ui/react";
import React from "react";

import { cities } from "../../utils/data";

const TopButton = ({ setCity }) => {
	// console.log({ setCity });
	return (
		<Flex justify="center" align="center" my="6" flexWrap={{ base: "wrap", md: "nowrap" }}>
			{cities.map((city) => (
				<Button
					size={{ base: "sm", md: "md" }}
					key={city.id}
					variant="unstyled"
					color="white"
					onClick={() => setCity({ q: city.title })}
				>
					{city.title === "Thành phố Hồ Chí Minh" ? "HCM City" : `${city.title}`}
				</Button>
			))}
		</Flex>
	);
};

export default TopButton;
