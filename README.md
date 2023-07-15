# DateComposer

A JavaScript utility to easilty deal with date & time and check expiration of any date

## Installation

```shell
npm i datecomposer
```

## Usage

```shell
import { DateComposer } from 'datecomposer';

const instance = new DateComposer();
```

- Getting Current Date and Time

```shell
console.log(instance.now()) 

---- output ----

{
  date: { day: 15, month: 'Jul', year: 2023 },
  time: { hour: 8, minute: 45, second: 19, phase: 'pm' }
}

```

- Getting Past Date and Time

```shell
console.log(instance.past(2)) 

---- output ----

{
  date: { day: 13, month: 'Jul', year: 2023 },
  time: { hour: 8, minute: 46, second: 47, phase: 'pm' }
}

```

- Getting Future Date and Time

```shell
console.log(instance.future(2)) 

---- output ----

{
  date: { day: 17, month: 'Jul', year: 2023 },
  time: { hour: 8, minute: 49, second: 48, phase: 'pm' }
}

```

- Check a wheather a date and time expired or not

```shell
const futureDate = instance.future(2);
const pastData = instance.past(2);

---- output ----

console.log(instance.isExpired(futureDate))  //false

console.log(instance.isExpired(pastDate))  //true

```