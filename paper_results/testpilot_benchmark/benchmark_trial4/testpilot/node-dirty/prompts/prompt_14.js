Your task is to write a test for the following function:
```
dirty.Dirty.once(emitter, name, options = kEmptyObject) async
```

This function is defined as follows:
```
async function once(emitter, name, options = kEmptyObject) {
  validateObject(options, 'options');
  const signal = options?.signal;
  validateAbortSignal(signal, 'options.signal');
  if (signal?.aborted)
    throw new AbortError(undefined, { cause: signal?.reason });
  return new Promise((resolve, reject) => {
    const errorListener = (err) => {
      emitter.removeListener(name, resolver);
      if (signal != null) {
        eventTargetAgnosticRemoveListener(signal, 'abort', abortListener);
      }
      reject(err);
    };
    const resolver = (...args) => {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      if (signal != null) {
        eventTargetAgnosticRemoveListener(signal, 'abort', abortListener);
      }
      resolve(args);
    };

    kResistStopPropagation ??= require('internal/event_target').kResistStopPropagation;
    const opts = { __proto__: null, once: true, [kResistStopPropagation]: true };
    eventTargetAgnosticAddListener(emitter, name, resolver, opts);
    if (name !== 'error' && typeof emitter.once === 'function') {
      // EventTarget does not have `error` event semantics like Node
      // EventEmitters, we listen to `error` events only on EventEmitters.
      emitter.once('error', errorListener);
    }
    function abortListener() {
      eventTargetAgnosticRemoveListener(emitter, name, resolver);
      eventTargetAgnosticRemoveListener(emitter, 'error', errorListener);
      reject(new AbortError(undefined, { cause: signal?.reason }));
    }
    if (signal != null) {
      eventTargetAgnosticAddListener(
        signal, 'abort', abortListener, { __proto__: null, once: true, [kResistStopPropagation]: true });
    }
  });
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.once', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.