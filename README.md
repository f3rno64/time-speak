# A natural language parser for dates, times, and durations

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

A tiny utility library **with no dependencies** that parses natural language
**dates**, **times**, and **intervals** to either a `Date` instance or a
numerical value in milliseconds. Here are some examples of possible inputs:

- **1 day ago**
- **in 2 hours and 5 minutes**
- **in a month**
- **2018-01-01T00:00:00.000Z**

## Installation

```bash
npm i --save time-speak
```

## Usage

Import the `parse` function call it with a string containing a natural language
representation of either a time in the future, past, or a duration. The return
value is a timestamp in milliseconds if the input is a duration, otherwise it
is a `Date` instance.

```js
import { parse } from 'time-speak'

const pastDate = parse('2 days and 4 hours ago')
const futureDate = parse('in 4 hours')
const durationMS = parse('6 months')

console.log({
  pastDate,    // 2023-12-19T13:02:39.768Z
  futureDate,  // 2023-12-21T21:02:39.768Z
  durationMS   // 15552000000
})
```

## Release History

See _[CHANGELOG.md](./CHANGELOG.md)_ for more information.

## License

Distributed under the **MIT** license. See [LICENSE.md](./LICENSE.md) for more
information.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

[npm-image]: https://img.shields.io/npm/v/time-speak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/time-speak
[npm-downloads]: https://img.shields.io/npm/dm/time-speak.svg?style=flat-square
