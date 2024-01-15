# A natural language parser for dates, times, and durations

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

A tiny utility library **with no dependencies** that parses natural language
**dates**, **times**, and **intervals** to either a `Date` instance or a
numerical value in milliseconds. Here are some examples of possible inputs:

- **two weeks ago**
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
const pastDateWithNumberWords = parse('two days and four hours ago')
const futureDate = parse('in 4 hours')
const durationMS = parse('6 months')

console.log({
  pastDateWithNumberWords,    // 2023-12-19T13:02:39.768Z
  pastDate,                   // 2023-12-19T13:02:39.768Z
  futureDate,                 // 2023-12-21T21:02:39.768Z
  durationMS                  // 15552000000
})
```

## API Reference

> The standalone JSDoc reference can be found in [DOCUMENTATION.md](DOCUMENTATION.md)

## Classes

<dl>
<dt><a href="#InvalidInputError">InvalidInputError</a></dt>
<dd><p>Error thrown when the input cannot be parsed to a date or duration. It
optionally accepts a <code>detail</code> parameter that can be used to provide more
information about why parsing failed.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#TimeUnit">TimeUnit</a></dt>
<dd><p>A mapping of time units to their millisecond values.</p>
</dd>
<dt><a href="#TimeUnitPlural">TimeUnitPlural</a></dt>
<dd><p>A mapping of plural time units to their singular counterparts.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parse">parse(input)</a> ⇒</dt>
<dd><p>Parses a string into a <code>Date</code> or number of milliseconds. The string can
describe the date in natural language (e.g. &quot;tomorrow&quot;, &quot;in 2 hours and 3
minutes&quot;, &quot;a month ago&quot;, etc.) or be a valid date string (e.g. &quot;2018-01-01&quot;).</p>
</dd>
</dl>

<a name="InvalidInputError"></a>

## InvalidInputError
Error thrown when the input cannot be parsed to a date or duration. It
optionally accepts a `detail` parameter that can be used to provide more
information about why parsing failed.

**Kind**: global class  
**Access**: public  

* [InvalidInputError](#InvalidInputError)
    * [new InvalidInputError(input, detail)](#new_InvalidInputError_new)
    * [._input](#InvalidInputError+_input)
    * [._detail](#InvalidInputError+_detail)
    * [.detail](#InvalidInputError+detail) ⇒
    * [.input](#InvalidInputError+input) ⇒

<a name="new_InvalidInputError_new"></a>

### new InvalidInputError(input, detail)
Create a new `InvalidInputError` instance with the given `input`,
optionally providing a `detail` parameter to describe why parsing failed.
The `detail` parameter will be included in the error message if provided.


| Param | Description |
| --- | --- |
| input | The input that could not be parsed |
| detail | A more detailed description of the error |

<a name="InvalidInputError+_input"></a>

### invalidInputError.\_input
The input that could not be parsed.

**Kind**: instance property of [<code>InvalidInputError</code>](#InvalidInputError)  
<a name="InvalidInputError+_detail"></a>

### invalidInputError.\_detail
An optional detailed description of the reason why parsing failed.

**Kind**: instance property of [<code>InvalidInputError</code>](#InvalidInputError)  
<a name="InvalidInputError+detail"></a>

### invalidInputError.detail ⇒
Get the detail explaining why parsing failed. If no detail was provided,
it will return an empty string.

**Kind**: instance property of [<code>InvalidInputError</code>](#InvalidInputError)  
**Returns**: The detail string.  
<a name="InvalidInputError+input"></a>

### invalidInputError.input ⇒
Get the original input that could not be parsed.

**Kind**: instance property of [<code>InvalidInputError</code>](#InvalidInputError)  
**Returns**: The input string.  
<a name="TimeUnit"></a>

## TimeUnit
A mapping of time units to their millisecond values.

**Kind**: global variable  
<a name="TimeUnitPlural"></a>

## TimeUnitPlural
A mapping of plural time units to their singular counterparts.

**Kind**: global variable  
<a name="parse"></a>

## parse(input) ⇒
Parses a string into a `Date` or number of milliseconds. The string can
describe the date in natural language (e.g. "tomorrow", "in 2 hours and 3
minutes", "a month ago", etc.) or be a valid date string (e.g. "2018-01-01").

**Kind**: global function  
**Returns**: The parsed date or number of milliseconds.  
**Throws**:

- [InvalidInputError](#InvalidInputError)
This exception is thrown if the input is invalid.

**Access**: public  

| Param | Description |
| --- | --- |
| input | The string to parse. |

**Example**  
Here are some example invocations:
```
const ... = parse('1 day ago')
const ... = parse('three days ago')
const ... = parse('in 2 hours and 3 minutes')
const ... = parse('a month')
const ... = parse('2018-01-01')
const ... = parse('2018-01-01T00:00:00.000Z')
```
**Example**  
Here are some example invocations that throw an exception:
```
parse('in 2 hours and 3 minutes ago')
parse('a month in the past')
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
