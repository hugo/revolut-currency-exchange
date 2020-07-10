This is (very simplified) immitation of the Revolut currency exchange.

## Requirements

### Hard requirements

- [x] Poll for new rates every 10 seconds
- [x] Offer (at least) three "pockets" in (at least) these currencies:
  - [x] GBP
  - [x] EUR
  - [x] USD
- [x] Facilitate trades between pockets
- [x] Have an input for each currency involved in the trade
  - [x] Only allow entering decimal numbers to 2dp
- [x] Show all required information
  - [x] Show current exchange rate
  - [x] Show "pocket" balances

### Stretch goals

- [x] Button to toggle trade direction (small enough and useful enough to do)
- [ ] Historical prices (likely will not bother)
- [ ] Auto exchange (also likely will not bother)

### Missing tests

Due to time constraints this is not, in fact, as thoroughly tested as it could
be. Hopefully the tests that are there show that I (mostly) know what I'm doing.

I should add some tests that validate that converting and clicking "exchange"
actually works. In the interest of time I have not done that. I've obviously
manually tested this flow, but that's not exactly production ready — oops!

Really need to check the logic around only allowing certain characters to be
typed into the input box. At the very least, a unit test around the regular
expression would be a good idea because I'm not 100% sure I got it right.
Regexes are hard!

### Areas for improvement

Show the +/- signs next to the amounts per the actual app.

Show the fee (where applicable) — would need a data source for this but would
otherwise be straightforward.

The state machine could arguably be split out a bit better. I think having it
all in one file is fine, but a bit more separation and organisation within that
file wouldn't go amis.

The input could still be tweaked to improve the UX. For example, putting the
cursor in a good place when you click to the left side.

The toggle button click area is a bit weird in Safari. Maybe a z-index thing?

The clunding together of visuals and behaviour isn't ideal. It would be better
to have separate components for each aspect.

### Other notes

I used Next because I'm familiar with it and it's an easy way to bootstrap a
TypeScript app.

The .env file is commited for ease of reviewing. I would not do that in a
production application. Rather, I'd create a .env.defaults for public stuff and
or .env.example showing the missing keys that can't be commited. (Although in
fairness, this one is only public info at present.)

The commit history should show a reasonable step by step progression through the
task. I'd normally rebase out the "fixup" commits but I've left then for the
sake of completeness. Even the embarassing one where I put a bunch of logic in
the wrong place. It happens to us all, eventually :)

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
