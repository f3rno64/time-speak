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
