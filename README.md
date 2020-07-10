This is (very simplified) immitation of the Revolut currency exchange.

## Requirements

### Hard requirements

- [ ] Poll for new rates every 10 seconds
- [ ] Offer (at least) three "pockets" in (at least) these currencies:
  - [ ] GBP
  - [ ] EUR
  - [ ] USD
- [ ] Facilitate trades between pockets
- [ ] Have an input for each currency involved in the trade
  - [ ] Only allow entering decimal numbers to 2dp
- [ ] Show all required information
  - [ ] Show current exchange rate
  - [ ] Show "pocket" balances

### Stretch goals

- [ ] Button to toggle trade direction (small enough and useful enough to do)
- [ ] Historical prices (likely will not bother)
- [ ] Auto exchange (also likely will not bother)

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn
```

Run the server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Tests

Use Jest and can be run using the standard invocation:

```bash
npm run test
# or, in watch mode
npm run test:watch
```

## Miscellanea

Format code using [prettier](https://prettier.io) and stop worrying about it.
