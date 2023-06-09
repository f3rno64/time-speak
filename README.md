# time-speak - A natural language parser for dates, times, durations, intervals

A library for parsing human-readable date, time, duration, and interval
strings. Includes classes to represent durations and intervals. Lightweight, no
dependencies.

Example input strings:

* "2023-04-30T09:41:55.884Z" (ISO)
* "2 hours"
* "1 day ago"
* "in 1 month and 2 weeks"
* "5pm"
* wip: "every monday at 5pm"
* wip: "every other friday at 8pm"

## Installation and Usage

DOCS TODO

![npm badge](https://nodei.co/npm/time-speak.png?downloads=true&downloadRank=true&stars=true)

```bash
yarn add time-speak
```

```js
const { parse } = require('time-speak')
const mts = parse('2 hours and 30 minutes')
```

### [Developing](#developing)

```bash
yarn gen-readme // update README.md
yarn docs // update DOCUMENTATION.md
yarn test // lint & mocha
yarn update-deps // bump all deps
```

### Release History

See *[CHANGELOG.md](CHANGELOG.md)* for more information.

### License

Distributed under the **MIT** license. See [LICENSE.md](LICENSE.md) for more information.

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

---

## API Reference

> The standalone JSDoc reference can be found in [DOCUMENTATION.md](DOCUMENTATION.md)



<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/time-speak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/time-speak
[npm-downloads]: https://img.shields.io/npm/dm/time-speak.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/f3rno64/time-speak/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/f3rno64/time-speak
