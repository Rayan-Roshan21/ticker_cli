# ticker

A live portfolio ticker for your terminal. Prices, position values, and daily change — refreshing every 30 seconds.

Built with [Ink](https://github.com/vadimdemedes/ink).

## Quick start

No install, no config:

```bash
npx @rayan-roshan21/ticker_cli AAPL MSFT NVDA
```

```
  SYMBOL         PRICE       CHG
  AAPL          308.91    -7.35%
  MSFT          464.72    +3.02%
  NVDA          200.75    +2.93%

  Updated 7:36:39 PM · Ctrl+C to quit
```

## Three ways to use it

### Quote mode

Pass symbols and get prices. Nothing to set up.

```bash
ticker AAPL MSFT
```

### Portfolio mode

Add `:shares` to any symbol and you get position values and a total.

```bash
ticker AAPL:10 VFV.TO:42
```

```
  SYMBOL         PRICE       VALUE       CHG    SHARES
  AAPL          308.91     3089.10    -7.35%        10
  VFV.TO        186.29     7824.18    +0.85%        42

  TOTAL                   10913.28

  Updated 7:36:39 PM · Ctrl+C to quit
```

### Saved portfolio

For holdings you check often, put them in `~/.tickerrc` and run `ticker` with no arguments.

```json
[
  { "symbol": "VFV.TO", "shares": 42 },
  { "symbol": "XIT.TO", "shares": 11 },
  { "symbol": "AAPL", "shares": 5 }
]
```

```bash
ticker
```

The file lives in your home directory, so your position sizes never end up in a git repo. Arguments always take priority over the config file.

## Install

```bash
npm install -g @rayan-roshan21/ticker_cli
```

The command is `ticker`. Requires Node.js 22 or later.

## Symbol format

Symbols follow Yahoo Finance conventions:

| Exchange | Suffix | Example |
| --- | --- | --- |
| NYSE / NASDAQ | none | `AAPL` |
| Toronto (TSX) | `.TO` | `VFV.TO` |
| TSX Venture | `.V` | `ABC.V` |
| London | `.L` | `VOD.L` |

If a symbol returns no data, look it up on [finance.yahoo.com](https://finance.yahoo.com) — whatever works there works here.

## Notes

**Market hours.** Outside trading hours you'll see the last close with a 0% change. That's expected — watch the "Updated" timestamp to confirm it's still refreshing.

**Data source.** Quotes come from Yahoo Finance via [yahoo-finance2](https://github.com/gadicc/yahoo-finance2). Yahoo offers no official public API and makes no guarantees about availability, so this can break without warning. Fine for a personal dashboard; don't build anything important on it.

**Delays.** Quotes may be delayed depending on the exchange.

## Disclaimer

This is a display tool. It is not financial advice, and the data may be inaccurate, delayed, or unavailable. Verify anything that matters with your broker.

## License

MIT
