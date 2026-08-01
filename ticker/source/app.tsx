import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

const portfolio = [
	{symbol: 'VFV.TO', shares: 42},
	{symbol: 'XIT.TO', shares: 11},
	{symbol: 'CHPS.TO', shares: 25},
	{symbol: 'HURA.TO', shares: 60},
	{symbol: 'ZGLD.TO', shares: 15},
];

type Holding = {
	symbol: string;
	shares: number;
	price: number;
	changePercent: number;
};

export default function App() {
	const [holdings, setHoldings] = useState<Holding[]>([]);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		const load = async () => {
			try {
				const quotes = (await yahooFinance.quote(
					portfolio.map(p => p.symbol),
				)) as any[];

				setHoldings(
					portfolio.map((p, i) => ({
						symbol: p.symbol,
						shares: p.shares,
						price: quotes[i]?.regularMarketPrice ?? 0,
						changePercent: quotes[i]?.regularMarketChangePercent ?? 0,
					})),
				);
			} catch (error_) {
				setError(String(error_));
			}
		};

		void load();
	}, []);

	if (error) {
		return <Text color="red">Error: {error}</Text>;
	}

	if (holdings.length === 0) {
		return <Text dimColor>Loading…</Text>;
	}
	const total = holdings.reduce((sum, h) => sum + h.shares * h.price, 0);

	return (
		<Box flexDirection="column" padding={2}>
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
				<Box width={10} justifyContent="flex-end">
					<Text bold dimColor>SHARES</Text>
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
