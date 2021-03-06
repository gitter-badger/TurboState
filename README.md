<p align="center">
  <img src="./others/logo.png"/>
</p>

<br/>

<p align="center">
  <!--START:VERSION-->
  <em><b>ALPHA 0.1.0</b></em>
  <!--END:VERSION-->
</p>

```javascript
  let turbocharge = TurboState.turbocharge

  let mustang = {
    engine: true,
    chassis: true,
    owner: { name: 'Duck Sauce', age: 19 }
  }

  // turbo-charge your object
  let gt500 = turbocharge(mustang)

  // assign some subscribers
  // .subscribe (propertiesToSubscribe, callback)
  let mechanic = gt500.subscribe({ engine: [], chassis: [] },
    (car) => (!car.engine || !car.chassis)
      ? console.log('mechanic at work')
      : console.log('mechanic available'))

  // callback ran after subscription
  // -> 'mechanic available'

  let electrician = gt500.subscribe({ engine: [], electronics: [] },
    (car) => (!car.engine || !car.electronics)
      ? console.log('electrician at work')
      : console.log('electrician available'))

  // -> 'electrician available'

  // do some updates
  gt500.update({ chassis: false })

  // -> 'mechanic at work'

  gt500.update({ engine: false })

  // -> 'mechanic at work'
  // -> 'electrician at work'

  // subscribe deeply
  let owner = gt500.subscribe({
    owner: {
      name: []
    }
  }, (car) => console.log(car.owner))

  gt500.update({
    owner: { name: 'Sammy Bananas' }
  })

  // -> { name: 'Sammy Bananas', age: 19 }

  // replace the value for the updated properties,
  // differently from .update(), which mergers.
  // in this case only .owner gets replaced, so
  // .engine, .chassis and .electronics are intact

  gt500.replace({
    owner: { firstName: 'Duke', lastName: 'Dumont' }
  })

  // owner callback in ran because the property it was
  // subscribed to, .owner.name, got affected by .replace()

  // -> { firstName: 'Duke', lastName: 'Dumont' }

  gt500.update({
    owner: { firstName: 'Tensnake' }
  })

  // no callback ran, .owner.name property was
  // not affected, as it no longer exists, and
  // there are no subscribers for owner.firstName

  // if in the future .owner.name gets added back
  // than the owner callback will be ran again

  // if you want to replace the whole state,
  // in this case not only .owner, use .replaceAll()

  gt500.replaceAll({ confiscated: true })

  // -> 'mechanic at work'
  // -> 'electrician at work'

  // this is a quick example of TurboState, check out
  // the API docs below for much more!! including
  // immutability, event hooks and configuration!
```

## About

## API

## Internals

## Contributing

## License
