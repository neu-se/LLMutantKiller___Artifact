Your task is to write a test for the following function:
```
dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listenerCount(type, listener)
```

This function is defined as follows:
```
function listenerCount(type, listener) {
  const events = this._events;

  if (events !== undefined) {
    const evlistener = events[type];

    if (typeof evlistener === 'function') {
      if (listener != null) {
        return listener === evlistener || listener === evlistener.listener ? 1 : 0;
      }

      return 1;
    } else if (evlistener !== undefined) {
      if (listener != null) {
        let matching = 0;

        for (let i = 0, l = evlistener.length; i < l; i++) {
          if (evlistener[i] === listener || evlistener[i].listener === listener) {
            matching++;
          }
        }

        return matching;
      }

      return evlistener.length;
    }
  }

  return 0;
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listenerCount', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.