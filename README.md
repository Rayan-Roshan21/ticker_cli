# ticker_cli

A live portfolio ticker for your terminal. Shows current prices, position values, and daily change for the holdings you configure — refreshing every 30 seconds.

Built with [Ink](https://github.com/vadimdemedes/ink).

```
  SYMBOL         PRICE       VALUE       CHG    SHARES
  VFV.TO        186.29     7824.18    +0.85%        42
  XIT.TO         73.31      806.41    -2.45%        11
  CHPS.TO        80.23     2005.75    +0.51%        25

  TOTAL                   10636.34

  Updated 7:12:01 PM · Ctrl+C to quit
```

## Install

Run it without installing:

```bash
npx ticker_cli
```

Or install globally:

```bash
npm install -g ticker_cli
```

Requires Node.js 22 or later.

## Setup

`ticker` reads your holdings from `~/.tickerrc`. Create it before first run:

```json
[
  { "symbol": "VFV.TO", "shares": 42 },
  { "symbol": "XIT.TO", "shares": 11 },
  { "symbol": "AAPL", "shares": 5 }
]
```

Each entry needs a `symbol` string and a `shares` number. That's it.

The file lives in your home directory, not in any project, so your position sizes never end up in a git repo.

### Symbol format

Symbols follow Yahoo Finance conventions:

| Exchange | Suffix | Example |
| --- | --- | --- |
| NYSE / NASDAQ | none | `AAPL` |
| Toronto (TSX) | `.TO` | `VFV.TO` |
| TSX Venture | `.V` | `ABC.V` |
| London | `.L` | `VOD.L` |

If a symbol returns no data, check it on [finance.yahoo.com](https://finance.yahoo.com) first — whatever works there works here.

## Usage

```bash
ticker
```

Prices refresh every 30 seconds. Press `Ctrl+C` to quit.

Daily change is green when positive, red when negative. `TOTAL` is the sum of all position values.

## Notes

**Market hours.** Outside trading hours you'll see the last close with a 0% change. That's expected, not a bug — watch the "Updated" timestamp to confirm it's still refreshing.

**Data source.** Quotes come from Yahoo Finance via [yahoo-finance2](https://github.com/gadicc/yahoo-finance2). Yahoo does not offer an official public API and makes no guarantees about availability or consistency, so this can break without warning. Fine for a personal dashboard; don't build anything important on it.

**Delays.** Quotes may be delayed depending on the exchange. Don't trade off these numbers.

## Disclaimer

This is a display tool. It is not financial advice, and the data may be inaccurate, delayed, or unavailable. Verify anything that matters with your broker.

## License

MIT
