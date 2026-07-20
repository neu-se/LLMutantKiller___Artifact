Your task is to write a test for the following function:
```
class dirty.Dirty.EventEmitter.EventEmitterAsyncResource(options = undefined)
```

This function is defined as follows:
```
class EventEmitterAsyncResource extends EventEmitter {
        /**
         * @param {{
         *   name?: string,
         *   triggerAsyncId?: number,
         *   requireManualDestroy?: boolean,
         * }} [options]
         */
        constructor(options = undefined) {
          let name;
          if (typeof options === 'string') {
            name = options;
            options = undefined;
          } else {
            if (new.target === EventEmitterAsyncResource) {
              validateString(options?.name, 'options.name');
            }
            name = options?.name || new.target.name;
          }
          super(options);

          this[kAsyncResource] =
            new EventEmitterReferencingAsyncResource(this, name, options);
        }

        /**
         * @param {symbol,string} event
         * @param  {...any} args
         * @returns {boolean}
         */
        emit(event, ...args) {
          if (this[kAsyncResource] === undefined)
            throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
          const { asyncResource } = this;
          ArrayPrototypeUnshift(args, super.emit, this, event);
          return ReflectApply(asyncResource.runInAsyncScope, asyncResource,
                              args);
        }

        /**
         * @returns {void}
         */
        emitDestroy() {
          if (this[kAsyncResource] === undefined)
            throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
          this.asyncResource.emitDestroy();
        }

        /**
         * @type {number}
         */
        get asyncId() {
          if (this[kAsyncResource] === undefined)
            throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
          return this.asyncResource.asyncId();
        }

        /**
         * @type {number}
         */
        get triggerAsyncId() {
          if (this[kAsyncResource] === undefined)
            throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
          return this.asyncResource.triggerAsyncId();
        }

        /**
         * @type {EventEmitterReferencingAsyncResource}
         */
        get asyncResource() {
          if (this[kAsyncResource] === undefined)
            throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
          return this[kAsyncResource];
        }
      }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.