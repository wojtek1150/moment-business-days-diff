# moment-business-days-diff

This is a [Moment.js](https://github.com/moment/moment/) plugin that allows you to work with only business days (Monday to Friday). You can customize the working week

## Usage

````javascript
// NodeJS: require instead of standard moment package
const moment = require('moment-business-days');
// You'll be able use Moment.js as you normally do
````

````html
<!-- Browser -->
<!-- NB: add after moment.js -->
<script src="moment.js"></script>
<script src="moment-business-days-diff.js"></script>
````


### Use localization to configure business days

````javascript
const moment = require('moment-business-days');

moment.updateLocale('us', {
   workingWeekdays: [1, 2, 3, 4, 5, 6]
});

// Defines days from 1 (Monday) to 6 (Saturday) as business days.
// When omitting this configuration parameter, business days are based on locale default
````

## API

#### `.isBusinessDay()` => boolean

Check if the date is a business day and return **true** or **false**:

```javascript
// 2018-09-17 is Monday
moment('2018-09-20', 'DD-MM-YYYY').isBusinessDay() // true

// 2018-09-20 is Sunday
moment('2018-09-20', 'DD-MM-YYYY').isBusinessDay() // false
```

#### `.businessDiff()` => number

Calculate the number of business days between dates.

```javascript
const diff = moment('2018-09-12').businessDiff(moment('2018-09-19'));
// diff = 5
```


#### `.countBusinessDaysInDaysFromDate()` => number

Calculate the number of business days in next given days

```javascript
const count = moment('2018-09-12').countBusinessDaysInDaysFromDate(7);
// count = 5
```