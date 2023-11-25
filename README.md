# time-speak - A natural language parser for dates, times and intervals

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

A tiny utility library providing a method that parses natural language dates,
times, and intervals to either a `Date` instance or a numerical value in
milliseconds.

## Installation

![npm badge](https://nodei.co/npm/time-speak.png?downloads=true&downloadRank=true&stars=true)

```bash
yarn add time-speak
```

## Developing

```bash
yarn gen-readme // update README.md
yarn docs // update DOCUMENTATION.md
yarn test // lint & mocha
yarn update-deps // bump all deps
```

## Release History

See *[CHANGELOG.md](CHANGELOG.md)* for more information.

## License

Distributed under the **MIT** license. See [LICENSE.md](LICENSE.md) for more information.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

---

### API Reference

> The standalone JSDoc reference can be found in [DOCUMENTATION.md](DOCUMENTATION.md)

<a name="parse"></a>

## parse(input) ⇒ <code>Date</code> \| <code>number</code>
Accepts a string representing a date, time, or duration in natural language,
and returns either a `Date` instance or an duration value in milliseconds.

**Kind**: global function  
**Throws**:

- <code>Error</code> if given invalid input


| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input string |

**Example**  
```js
const ... = parse('in 5 minutes')
const ... = parse('10 days and 3 hours ago')
const ... = parse('30 minutes')
```


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/time-speak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/time-speak
[npm-downloads]: https://img.shields.io/npm/dm/time-speak.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/f3rno64/time-speak/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/f3rno64/time-speak
