import React from 'react';
import {Box, Text} from 'ink';

type Holding = {
	symbol: string;
	shares: number;
	price: number;
	changePercent: number;
};

// Fake data for now — real quotes come in step 6.
const holdings: Holding[] = [
	{symbol: 'VFV.TO', shares: 42, price: 152.31, changePercent: 0.84},
	{symbol: 'XIT.TO', shares: 11, price: 78.02, changePercent: -1.12},
	{symbol: 'CHPS.TO', shares: 25, price: 44.9, changePercent: 2.03},
	{symbol: 'HURA.TO', shares: 60, price: 18.44, changePercent: -0.35},
	{symbol: 'ZGLD.TO', shares: 15, price: 31.77, changePercent: 0.12},
];

export default function App() {
	const total = holdings.reduce((sum, h) => sum + h.shares * h.price, 0);

	return (
		<Box flexDirection="column" padding={2xw}>
			<Box marginBottom={1}>
				<Box width={10}>
					<Text bold dimColor>SYMBOL</Text>
				</Box>
				<Box width={10} justifyContent="flex-end">
					<Text bold dimColor>PRICE</Text>
				</Box>
				<Box width={12} justifyContent="flex-end">
					<Text bold dimColor>VALUE</Text>
				</Box>
				<Box width={10} justifyContent="flex-end">
					<Text bold dimColor>CHG</Text>
				</Box>
			</Box>

			{holdings.map(h => (
				<Box key={h.symbol}>
					<Box width={10}>
						<Text>{h.symbol}</Text>
					</Box>
					<Box width={10} justifyContent="flex-end">
						<Text>{h.price.toFixed(2)}</Text>
					</Box>
					<Box width={12} justifyContent="flex-end">
						<Text>{(h.shares * h.price).toFixed(2)}</Text>
					</Box>
					<Box width={10} justifyContent="flex-end">
						<Text color={h.changePercent >= 0 ? 'green' : 'red'}>
							{h.changePercent >= 0 ? '+' : ''}
							{h.changePercent.toFixed(2)}%
						</Text>
					</Box>
				</Box>
			))}

			<Box marginTop={1}>
				<Box width={10}>
					<Text bold>TOTAL</Text>
				</Box>
				<Box width={22} justifyContent="flex-end">
					<Text bold>{total.toFixed(2)}</Text>
				</Box>
			</Box>
		</Box>
	);
}
