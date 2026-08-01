import {homedir} from 'node:os';
import {join} from 'node:path';
import {readFile} from 'node:fs/promises';

export type Position = {
	symbol: string;
	shares: number;
};

export const configPath = join(homedir(), '.tickerrc');

export async function loadConfig(): Promise<Position[]> {
	let raw: string;

	try {
		raw = await readFile(configPath, 'utf8');
	} catch {
		throw new Error(`No config found. Create ${configPath} — see readme.`);
	}

	let parsed: unknown;

	try {
		parsed = JSON.parse(raw);
	} catch {
		throw new Error(`${configPath} is not valid JSON.`);
	}

	if (!Array.isArray(parsed) || parsed.length === 0) {
		throw new Error(`${configPath} must be a non-empty array of positions.`);
	}

	for (const item of parsed) {
		if (typeof item?.symbol !== 'string' || typeof item?.shares !== 'number') {
			throw new Error(
				`Each position needs a "symbol" string and "shares" number.`,
			);
		}
	}

	return parsed as Position[];
}