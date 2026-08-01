import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import YahooFinance from 'yahoo-finance2';
import {loadConfig} from './config.js';

const yahooFinance = new YahooFinance({suppressNotices: ['yahooSurvey']});

type Holding = {
	symbol: string;
	shares: number;
	price: number;
	changePercent: number;
};

type Position = {
	symbol: string;
	shares: number;
};

type Props = {
	symbols: string[];
};


// "AAPL" → 1 share. "AAPL:10" → 10 shares.
function parseArgs(args: string[]): Position[] {
	return args.map(arg => {
		const [symbol, shares] = arg.split(':');
		return {
			symbol: symbol!.toUpperCase(),
			shares: shares ? Number(shares) : 1,
		};
	});
}

export default function App({symbols}: Props) {
	const usingArgs = symbols.length > 0;
	const [holdings, setHoldings] = useState<Holding[]>([]);
	const [error, setError] = useState<string | undefined>();
	const [updatedAt, setUpdatedAt] = useState<Date | undefined>();

	useEffect(() => {
		let timer: NodeJS.Timeout;

		const start = async () => {
			try {
				const positions = usingArgs ? parseArgs(symbols) : await loadConfig();
				const load = async () => {
					try {
						const quotes = (await yahooFinance.quote(
							positions.map(p => p.symbol),
						)) as any[];

						setHoldings(
							positions.map((p, i) => ({
								symbol: p.symbol,
								shares: p.shares,
								price: quotes[i]?.regularMarketPrice ?? 0,
								changePercent: quotes[i]?.regularMarketChangePercent ?? 0,
							})),
						);
						setUpdatedAt(new Date());
						setError(undefined);
					} catch (error_) {
						setError(String(error_));
					}
				};

				await load();
				timer = setInterval(load, 30_000);
			} catch (error_) {
				setError(error_ instanceof Error ? error_.message : String(error_));
			}
		};

		void start();

		return () => {
			clearInterval(timer);
		};
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
					<Box width={12} justifyContent="flex-end">
						<Text>{h.shares}</Text>
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
				{updatedAt && (
		<Box marginTop={1}>
					<Box flexDirection="column">
						<Text dimColor>
							Updated {updatedAt.toLocaleTimeString()} · Ctrl+C to quit
						</Text>
						<Text dimColor>Data from Yahoo Finance</Text>
					</Box>
		</Box>
	)}
		</Box>
	);
}
