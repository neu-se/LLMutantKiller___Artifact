Your task is to write a test for the following function:
```
dirty.Dirty.on(emitter, event, options = kEmptyObject)
```

This function is defined as follows:
```
function on(emitter, event, options = kEmptyObject) {
  // Parameters validation
  validateObject(options, 'options');
  const signal = options.signal;
  validateAbortSignal(signal, 'options.signal');
  if (signal?.aborted)
    throw new AbortError(undefined, { cause: signal?.reason });
  // Support both highWaterMark and highWatermark for backward compatibility
  const highWatermark = options.highWaterMark ?? options.highWatermark ?? NumberMAX_SAFE_INTEGER;
  validateInteger(highWatermark, 'options.highWaterMark', 1);
  // Support both lowWaterMark and lowWatermark for backward compatibility
  const lowWatermark = options.lowWaterMark ?? options.lowWatermark ?? 1;
  validateInteger(lowWatermark, 'options.lowWaterMark', 1);

  // Preparing controlling queues and variables
  FixedQueue ??= require('internal/fixed_queue');
  const unconsumedEvents = new FixedQueue();
  const unconsumedPromises = new FixedQueue();
  let paused = false;
  let error = null;
  let finished = false;
  let size = 0;

  const iterator = ObjectSetPrototypeOf({
    next() {
      // First, we consume all unread events
      if (size) {
        const value = unconsumedEvents.shift();
        size--;
        if (paused && size < lowWatermark) {
          emitter.resume();
          paused = false;
        }
        return PromiseResolve(createIterResult(value, false));
      }

      // Then we error, if an error happened
      // This happens one time if at all, because after 'error'
      // we stop listening
      if (error) {
        const p = PromiseReject(error);
        // Only the first element errors
        error = null;
        return p;
      }

      // If the iterator is finished, resolve to done
      if (finished) return closeHandler();

      // Wait until an event happens
      return new Promise(function(resolve, reject) {
        unconsumedPromises.push({ resolve, reject });
      });
    },

    return() {
      return closeHandler();
    },

    throw(err) {
      if (!err || !(err instanceof Error)) {
        throw new ERR_INVALID_ARG_TYPE('EventEmitter.AsyncIterator',
                                       'Error', err);
      }
      errorHandler(err);
    },
    [SymbolAsyncIterator]() {
      return this;
    },
    [kWatermarkData]: {
      /**
       * The current queue size
       */
      get size() {
        return size;
      },
      /**
       * The low watermark. The emitter is resumed every time size is lower than it
       */
      get low() {
        return lowWatermark;
      },
      /**
       * The high watermark. The emitter is paused every time size is higher than it
       */
      get high() {
        return highWatermark;
      },
      /**
       * It checks whether the emitter is paused by the watermark controller or not
       */
      get isPaused() {
        return paused;
      },
    },
  }, AsyncIteratorPrototype);

  // Adding event handlers
  const { addEventListener, removeAll } = listenersController();
  kFirstEventParam ??= require('internal/events/symbols').kFirstEventParam;
  addEventListener(emitter, event, options[kFirstEventParam] ? eventHandler : function(...args) {
    return eventHandler(args);
  });
  if (event !== 'error' && typeof emitter.on === 'function') {
    addEventListener(emitter, 'error', errorHandler);
  }
  const closeEvents = options?.close;
  if (closeEvents?.length) {
    for (let i = 0; i < closeEvents.length; i++) {
      addEventListener(emitter, closeEvents[i], closeHandler);
    }
  }

  const abortListenerDisposable = signal ? addAbortListener(signal, abortListener) : null;

  return iterator;

  function abortListener() {
    errorHandler(new AbortError(undefined, { cause: signal?.reason }));
  }

  function eventHandler(value) {
    if (unconsumedPromises.isEmpty()) {
      size++;
      if (!paused && size > highWatermark) {
        paused = true;
        emitter.pause();
      }
      unconsumedEvents.push(value);
    } else unconsumedPromises.shift().resolve(createIterResult(value, false));
  }

  function errorHandler(err) {
    if (unconsumedPromises.isEmpty()) error = err;
    else unconsumedPromises.shift().reject(err);

    closeHandler();
  }

  function closeHandler() {
    abortListenerDisposable?.[SymbolDispose]();
    removeAll();
    finished = true;
    const doneResult = createIterResult(undefined, true);
    while (!unconsumedPromises.isEmpty()) {
      unconsumedPromises.shift().resolve(doneResult);
    }

    return PromiseResolve(doneResult);
  }
}
```

You may use the following examples to guide your implementation:
```
// usage #1
  var Dirty = require('dirty');  var db = new Dirty('user.db');  db.on('load', function() {    db.set('john', {eyes: 'blue'});    console.log('Added john, he has %s eyes.', db.get('john').eyes);    db.set('bob', {eyes: 'brown'}, function() {      console.log('User bob is now saved on disk.')    });    db.forEach(function(key, val) {      console.log('Found key: %s, val: %j', key, val);    });  });  db.on('drain', function() {    console.log('All records are saved on disk now.');  });
// usage #2
'use strict';// eslint-disable-next-line node/no-missing-requireconst Dirty = require('dirty');const path = require('path');const db = new Dirty(path.join(__dirname, 'bob.dirty'));db.on('load', () => {  db.set('john', {eyes: 'blue'});  console.log('Added john, he has %s eyes.', db.get('john').eyes);  db.set('bob', {eyes: 'brown'}, () => {    console.log('User bob is now saved on disk.');  });  db.forEach((key, val) => {    console.log('Found key: %s, val: %j', key, val);  });});
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.on', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.