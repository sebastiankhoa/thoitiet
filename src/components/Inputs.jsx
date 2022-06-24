import React, { useState, useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { Box, Button, Divider, Flex, Input } from "@chakra-ui/react";

const Inputs = ({ setQuery, units, setUnits }) => {
	const [city, setCity] = useState("");

	const searchHandle = () => {
		if (city) {
			setQuery({ q: city });
		}
	};

	const locationHandle = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				let lat = pos.coords.latitude;
				let lon = pos.coords.longitude;

				setQuery({
					lat,
					lon,
				});
			});
		}
	};

	const unitChangeHandle = (e) => {
		const unit = e.target.name;
		setUnits(unit);
	};

	return (
		<Flex justify="center" gap="4" mt="50px">
			<Input
				type="text"
				placeholder="Nhập tên thành phố..."
				bg="white"
				w="50%"
				textTransform="capitalize"
				_placeholder={{ textTransform: "lowercase" }}
				value={city}
				onChange={(e) => setCity(e.target.value)}
			/>
			<Flex align="center" color="white" gap="5">
				<Box cursor="pointer" _hover={{ transform: "scale(1.2)" }} transition="0.5s" onClick={searchHandle}>
					<AiOutlineSearch size="1.5rem" />
				</Box>
				<Box cursor="pointer" _hover={{ transform: "scale(1.2)" }} transition="0.5s" onClick={locationHandle}>
					<GoLocation size="1.3rem" />
				</Box>
			</Flex>
			<Flex>
				<Button
					name="metric"
					variant="unstyled"
					color="white"
					_hover={{ transform: "scale(1.2)" }}
					transition="0.5s"
					onClick={unitChangeHandle}
				>
					°C
				</Button>
				<Divider orientation="vertical" />
				<Button
					name="imperial"
					variant="unstyled"
					color="white"
					_hover={{ transform: "scale(1.2)" }}
					transition="0.5s"
					onClick={unitChangeHandle}
				>
					°F
				</Button>
			</Flex>
		</Flex>
	);
};

export default Inputs;
