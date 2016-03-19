<center>

  ![Turbo State Logo](./TurboState_Logo.svg)

</center>

---

<center>

<!--START:VERSION-->
***ALPHA 0.1.0***
<!--END:VERSION-->

</center>

```javascript
import { turbocharge } from 'turbostate'

let mustang = {
  engine: true,
  chassis: true,
  owner: {
    name: 'Duck Sauce',
    age: 19,
    location: 'Mondo'
  }
}

// turbo-charge your object

let gt500 = turbocharge (mustang)

// assign some subscribers
// .subscribe (propertiesToSubscribe, callback)

let mechanic = gt500.subscribe ({
  engine: {},
  chassis: {}
}, (car) => {
  if (! car.engine || ! car.chassis)
    console.log ('mechanic at work')
  else
    console.log ('mechanic available')
})

// callback ran after subscription

// > 'mechanic available'

let electrician = gt500.subscribe ({
  engine: {},
  electronics: {}
}, (car) => {
  if (! car.engine || ! car.electronics)
    console.log ('electrician at work')
  else
    console.log ('electrician available')
})

// > 'electrician available'

// do some updates

gt500.update ({ chassis: false })

// > 'mechanic at work'

gt500.update ({ engine: false })

// > 'mechanic at work'
// > 'electrician at work'

// subscribe deeply

let owner = gt500.subscribe ({
  owner: {
    name: {}
  }
}, (car) => console.log (car.owner))

gt500.update ({
  owner: {
    name: 'Sammy Bananas'
  }
})

// > { name: 'Sammy Bananas', age: 19, location: 'Mondo' }

// replace the value for the updated properties,
// differently from .update(), which mergers.
// in this case only .owner gets replaced, so
// .engine, .chassis and .electronics are intact

gt500.replace ({
  owner: {
    firstName: 'Duke'
    lastName: 'Dumont'
  }
})

// owner callback in ran because the property it was
// subscribed to, .owner.name, got affected by .replace()

// > { firstName: 'Duke', lastName: 'Dumont' }

gt500.update ({
  owner: {
    firstName: 'Tensnake'
  }
})

// no callback ran, .owner.name property was
// not affected, as it no longer exists, and
// there are no subscribers for owner.firstName

// if in the future .owner.name gets added back
// than the owner callback will be ran again

// if you want to replace the whole state,
// in this case not only .owner, use .replaceAll()

gt500.replaceAll ({
  confiscated: true
})

// > 'mechanic at work'
// > 'electrician at work'

```


## About

## API

## Internals

## Contributing

## License
