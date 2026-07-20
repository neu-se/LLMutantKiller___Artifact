Your task is to write a test for the following function:
```
dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners(type)
```

This function is defined as follows:
```
function removeAllListeners(type) {
      const events = this._events;
      if (events === undefined)
        return this;

      // Not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = { __proto__: null };
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = { __proto__: null };
          else
            delete events[type];
        }
        this[kShapeMode] = false;
        return this;
      }

      // Emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        for (const key of ReflectOwnKeys(events)) {
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = { __proto__: null };
        this._eventsCount = 0;
        this[kShapeMode] = false;
        return this;
      }

      const listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (let i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.