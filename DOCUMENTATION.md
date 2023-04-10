## Classes

<dl>
<dt><a href="#Duration">Duration</a></dt>
<dd><p>A class representing a duration, initialized in milliseconds. Provides
utility methods to convert to other units (hours, minutes, etc).</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#TimeUnit">TimeUnit</a></dt>
<dd><p>Units of time</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parseString">parseString(input)</a> ⇒ <code>number</code></dt>
<dd><p>Parse a string to an mts value. Does not take whitespace into consideration.
Examples of valid inputs:</p>
<ul>
<li>&#39;2 days ago&#39;</li>
<li>&#39;in 1 week and 3 days&#39;</li>
<li>&#39;1 year and 7 months ago&#39;</li>
</ul>
</dd>
<dt><a href="#mtsDay">mtsDay()</a></dt>
<dd><p>Get days as an mts value</p>
</dd>
<dt><a href="#mtsHour">mtsHour()</a></dt>
<dd><p>Get hours as an mts value</p>
</dd>
<dt><a href="#mtsMillisecond">mtsMillisecond()</a></dt>
<dd><p>Get milliseconds as an mts value</p>
</dd>
<dt><a href="#mtsMinute">mtsMinute()</a></dt>
<dd><p>Get minutes as an mts value</p>
</dd>
<dt><a href="#mtsMonth">mtsMonth()</a></dt>
<dd><p>Get months as an mts value</p>
</dd>
<dt><a href="#mtsSecond">mtsSecond()</a></dt>
<dd><p>Get seconds as an mts value</p>
</dd>
<dt><a href="#mtsWeek">mtsWeek()</a></dt>
<dd><p>Get weeks as an mts value</p>
</dd>
<dt><a href="#mtsYear">mtsYear()</a></dt>
<dd><p>Get years as an mts value</p>
</dd>
</dl>

<a name="Duration"></a>

## Duration
A class representing a duration, initialized in milliseconds. Provides
utility methods to convert to other units (hours, minutes, etc).

**Kind**: global class  

* [Duration](#Duration)
    * [new Duration(value)](#new_Duration_new)
    * [.getValue()](#Duration+getValue) ⇒ <code>number</code>
    * [.toMilliseconds()](#Duration+toMilliseconds) ⇒ <code>number</code>
    * [.toSeconds()](#Duration+toSeconds) ⇒ <code>number</code>
    * [.toMinutes()](#Duration+toMinutes) ⇒ <code>number</code>
    * [.toHours()](#Duration+toHours) ⇒ <code>number</code>
    * [.toDays()](#Duration+toDays) ⇒ <code>number</code>
    * [.toWeeks()](#Duration+toWeeks) ⇒ <code>number</code>
    * [.toMonths()](#Duration+toMonths) ⇒ <code>number</code>
    * [.toYears()](#Duration+toYears) ⇒ <code>number</code>
    * [.toUnits(options?)](#Duration+toUnits) ⇒ <code>DurationInUnits</code>
    * [.toString()](#Duration+toString) ⇒ <code>string</code>
    * [.fromDate(d)](#Duration+fromDate) ⇒ <code>number</code>
    * [.fromNow()](#Duration+fromNow) ⇒ <code>number</code>
    * [.toDate()](#Duration+toDate) ⇒ <code>Date</code>

<a name="new_Duration_new"></a>

### new Duration(value)
Create a new duration from a millisecond value.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | value in milliseconds |

<a name="Duration+getValue"></a>

### duration.getValue() ⇒ <code>number</code>
Get millisecond value.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - value  
<a name="Duration+toMilliseconds"></a>

### duration.toMilliseconds() ⇒ <code>number</code>
Convert to milliseconds.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inMilliseconds  
<a name="Duration+toSeconds"></a>

### duration.toSeconds() ⇒ <code>number</code>
Convert to seconds.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inSeconds  
<a name="Duration+toMinutes"></a>

### duration.toMinutes() ⇒ <code>number</code>
Convert to minutes.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inMinutes  
<a name="Duration+toHours"></a>

### duration.toHours() ⇒ <code>number</code>
Convert to hours.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inHours  
<a name="Duration+toDays"></a>

### duration.toDays() ⇒ <code>number</code>
Convert to days.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inDays  
<a name="Duration+toWeeks"></a>

### duration.toWeeks() ⇒ <code>number</code>
Convert to weeks.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inWeeks  
<a name="Duration+toMonths"></a>

### duration.toMonths() ⇒ <code>number</code>
Convert to months.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inMonths  
<a name="Duration+toYears"></a>

### duration.toYears() ⇒ <code>number</code>
Convert to years.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - inYears  
<a name="Duration+toUnits"></a>

### duration.toUnits(options?) ⇒ <code>DurationInUnits</code>
Get the duration represented in each time unit (day, week, etc).

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>DurationInUnits</code> - unitValues  

| Param | Type | Description |
| --- | --- | --- |
| options? | <code>DurationToUnitsOptions</code> | optional |

<a name="Duration+toString"></a>

### duration.toString() ⇒ <code>string</code>
* Convert to human-readable string. Each unit is represented in order from
largest to smallest. i.e. 368 days would result in '1 year 3 days'.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>string</code> - result  
<a name="Duration+fromDate"></a>

### duration.fromDate(d) ⇒ <code>number</code>
Get the value in milliseconds after the provided date.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - value  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>Date</code> \| <code>number</code> | input |

<a name="Duration+fromNow"></a>

### duration.fromNow() ⇒ <code>number</code>
Get the value in milliseconds after the current time.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>number</code> - value  
<a name="Duration+toDate"></a>

### duration.toDate() ⇒ <code>Date</code>
Get a date set to the current time plus the duration value.

**Kind**: instance method of [<code>Duration</code>](#Duration)  
**Returns**: <code>Date</code> - value  
<a name="TimeUnit"></a>

## TimeUnit
Units of time

**Kind**: global variable  
<a name="parseString"></a>

## parseString(input) ⇒ <code>number</code>
Parse a string to an mts value. Does not take whitespace into consideration.
Examples of valid inputs:
  - '2 days ago'
  - 'in 1 week and 3 days'
  - '1 year and 7 months ago'

**Kind**: global function  
**Returns**: <code>number</code> - mts  
**Throws**:

- ParseError if parsing fails for any reason


| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input |

<a name="mtsDay"></a>

## mtsDay()
Get days as an mts value

**Kind**: global function  
<a name="mtsHour"></a>

## mtsHour()
Get hours as an mts value

**Kind**: global function  
<a name="mtsMillisecond"></a>

## mtsMillisecond()
Get milliseconds as an mts value

**Kind**: global function  
<a name="mtsMinute"></a>

## mtsMinute()
Get minutes as an mts value

**Kind**: global function  
<a name="mtsMonth"></a>

## mtsMonth()
Get months as an mts value

**Kind**: global function  
<a name="mtsSecond"></a>

## mtsSecond()
Get seconds as an mts value

**Kind**: global function  
<a name="mtsWeek"></a>

## mtsWeek()
Get weeks as an mts value

**Kind**: global function  
<a name="mtsYear"></a>

## mtsYear()
Get years as an mts value

**Kind**: global function  
