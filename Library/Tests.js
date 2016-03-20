// eslint globals
/* global describe, it, require */

// -----------------------------------------------------

//                                               IMPORTS

let Immutable = require('seamless-immutable')
let TurboState = require('./TurboState')
let { assert } = require('chai')

// -----------------------------------------------------

//                                     MOCKS & UTILITIES

let Utilities = {
  consoleMock: function (outputsReference) {
    return {
      log: function () {
        outputsReference[0] = outputsReference[0]
          .concat(Array.prototype.slice.call(arguments))
      }
    }
  }
}

// -----------------------------------------------------

//                                                 TESTS

describe('TurboState Test Suite', () => {
  //
  // wrapping object with .turbocharge()
  //
  describe('turbocharging', () => {
    //
    // UMD
    //
    it('loads library', () => assert.ok(TurboState))
    //
    // .turbocharge
    //
    it('turbocharges an object, giving it the correct api', () => {
      assert.fail('')
    })
    //
    // functions of wrapped object
    //
    describe('turbocharged object', () => {
      //
      // .subscribe
      // -> subscribe, check if returns id
      //
      it('subscribes to object updates', () => {
        //
        // returns subscription id
        //
        assert.fail('')
      })
      //
      // .update
      // shallow and deep structure.
      // single (object) and multiple (array).
      // callback runs whenever subscribed
      // properties are affected (inserted, updated, removed  ).
      // -> subscribe, update, callback should run
      //
      it('updates an object and runs callbacks', () => {
        //
        // single callback
        //
        assert.fail('')
        //
        // multiple callbacks
        //
      })
      //
      // .unsubscribe
      // -> subscribe, update, callback should run,
      //    unsubscribe, update, callback should not run
      //
      it('unsubscribe from object updates', () => {
        assert.fail('')
      })
      //
      // .replace
      //
      it('', () => {
        assert.fail('')
      })
      //
      // .replaceAll
      //
      it('', () => {
        assert.fail('')
      })
    })
  })
  //
  // configuration for each instance of .turbocharge()
  //
  describe('turbocharging configuration', () => {
    //
    // .tubocharge
    // if it successfully turbocharges passing the configuration
    // parameter. -> turbocharge and run subscribe cycle
    //
    it('turbocharges an object, with configuration', () => {
      assert.fail('')
    })
    //
    // ability to run a function before certain processes
    // in TurboState. useful if you want to implement
    // a wrapper data type like seamless-immutable.
    //
    describe('Event Hooks', () => {
      //
      it('before update', () => {
        assert.fail('')
      })
      //
      it('after update', () => {
        assert.fail('')
      })
      //
      it('before callback', () => {
        assert.fail('')
      })
    })
  })
  //
  // global configuration for TurboState
  //
  describe('TurboState configuration', () => {
    //
    it('webworker quantity', () => {
      assert.fail('')
    })
  })
})

describe('TurboState Examples', () => {
  //
  // included in README.md
  //
  it('intro example', () => {
    //
    // will hold output given to console.log,
    // used at the end of this function to
    // test if the example worked as expected
    //
    let outputs = [[]]
    let console = Utilities.consoleMock(outputs)

    //
    // example code
    //
    assert.doesNotThrow(() => {
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
        (car) =>
          (!car.engine || !car.chassis)
            ? console.log('mechanic at work')
            : console.log('mechanic available'))

      // callback ran after subscription
      // -> 'mechanic available'

      let electrician = gt500.subscribe({ engine: [], electronics: [] },
        (car) =>
          (!car.engine || !car.electronics)
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
          name: {}
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

      /* not part of example, just so eslint can relax*/
      return [owner, mechanic, electrician]
    })

    //
    // check if outputs are correct
    //
    assert.deepEqual(outputs[0], [])
  })
  //
  // ability to add functionality to
  // TurboState by using event hooks
  //
  it('event hooks', () => {
    //
    let outputs = [[]]
    let console = Utilities.consoleMock(outputs)

    assert.doesNotThrow(() => {
      let turbocharge = TurboState.turbocharge()

      // options are passed as the second parameter to turbocharge()
      let options = {
        hooks: {
          // before any update
          before: function (value, action) {
            // action :'update'|'replace'|'replaceAll'
            console.log('action: ' + value)
            // return the value that will be used in the update
            return Object.assign({}, value, {
              emission: value.emission / 30
            })
          },
          // after any update
          after: function (car) {
            // value that will be passed to callbacks, in this case
            // using seamless-immutable library to freeze the object
            return Immutable(car)
          },
          // before each callback
          beforeCallback: function (car, callbackFunction, subscriberId) {
            // if this function returns false than
            // the current callback will be skipped (not ran).
            // returns the value that will be passed to callback
            return car
          }
        }
      }

      let car = turbocharge({ engine: 'diesel', emission: 0 }, options)

      car.subscribe({ emission: [] }, (car) => {
        // verify immutability
        try {
          car.engine = 'another one'
        } catch (e) {
          console.log('car is immutable')
        }
      })

      car.update({ emission: 900 })

      // -> 'car is immutable'
    })

    assert.deepEqual(outputs[0], [])
  })
  //
  it('local configuration', () => {
    assert.ok(
      'at the moment only hooks are available as local configuration ' +
      'option, which is covered by the `event hooks` test')
  })
  //
  // (window or worker)
  // (window || self).TurboState.configuration
  //
  it('global configuration', () => {
    //
    let outputs = [[]]
    let console = Utilities.consoleMock(outputs)

    //
    // mock window and TurboState, so the example
    // can be written the way it will be used
    //
    let window = { TurboState: {} }
    let _TurboState = TurboState
    let TurboState = {
      turbocharge: function () {
        _TurboState.turbocharge.apply(window, arguments)
      }
    }

    assert.doesNotThrow(() => {
      //
      let turbocharge = TurboState.turbocharge

      //
      let defaultOptions = {
        hooks: { after: (value) => Immutable(value) }
      }

      //
      let configuration = {
        maxWebWorker: 2,
        defaultOptions: defaultOptions
      }

      //
      window.TurboState = { configuration: configuration }

      //
      let motorcycle = turbocharge({
        model: 'MT-09',
        cc: 847
      })

      motorcycle.subscribe({ model: [] }, (motorcycle) => {
        try {
          motorcycle.model = 'another one'
        } catch (e) {
          console.log('motorcycle is immutable')
        }
      })

      motorcycle.update({ model: 'MT-07' })

      // -> 'motorcycle is immutable'
    })

    assert.deepEqual(outputs[0], [])
  })
})
