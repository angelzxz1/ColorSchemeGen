"use client";

import Section from "../components/Section";
import { Flex, Box, useColorModeValue, Input, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HsvToHex } from "../lib/colors";
import { circle, ColorsController, ColorsContainer, Dot } from "../components";

export default function Page(): JSX.Element {
	const [boxSize, setBoxSize] = useState(500);
	const [radius, setRadius] = useState(boxSize / 4);
	const [centerRadius, setCenterRadius] = useState(0);
	const [colorBG, setColorBG] = useState(0);
	const [arrayDots, setArrayDots] = useState<
		{ x: number; y: number; color: string }[]
	>([]);

	const circleUpdate = () => {
		const Circle = circle(radius, centerRadius, boxSize);
		let tempArrayColors: string[] = [];
		let tempArrayDots: { x: number; y: number; color: string }[] = [];
		Circle.map(position => {
			// console.log(position);
			const { x, y, floorX, floorY } = position;
			const color = HsvToHex(
				colorBG,
				floorX < 0 ? 0 : floorX > 100 ? 100 : floorX,
				floorY < 0 ? 0 : floorY > 100 ? 100 : floorY
			);
			tempArrayDots.push({
				x: x,
				y: y,
				color: color,
			});

			// console.log(arrayColors);
		});
		setArrayDots(tempArrayDots.reverse());
	};
	useEffect(() => {
		circleUpdate();
	}, [boxSize, centerRadius, colorBG]);
	return (
		<Flex
			w="100%"
			justify="center"
			align="center"
			direction="column"
			my={24}
		>
			<ColorsContainer arrayDots={arrayDots} />
			<ColorsController
				boxSize={boxSize}
				setBoxSize={setBoxSize}
				setRadius={setRadius}
				centerRadius={centerRadius}
				setCenterRadius={setCenterRadius}
				colorBG={colorBG}
				setColorBG={setColorBG}
			/>
			{/* <Flex
				w={`${boxSize}px`}
				h={`${boxSize}px`}
				bg="teal.300"
				position="relative"
				mt={24}
			>
				{arrayDots.map((item, i) => {
					return (
						<Dot
							key={i}
							x={
								item.x < 0
									? "0px"
									: item.x > boxSize - 10
									? `${boxSize - 10}px`
									: `${item.x}px`
							}
							y={
								item.y < 0
									? "0"
									: item.y > boxSize - 10
									? `${boxSize - 10}px`
									: `${item.y}px`
							}
							colorBG={item.color}
						/>
					);
				})}
			</Flex> */}
		</Flex>
	);
}
