Your task is to write a test for the following function:
```
dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emit(event, ...args)
```

This function is defined as follows:
```
emit(event, ...args) {
          if (this[kAsyncResource] === undefined)
            throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
          const { asyncResource } = this;
          ArrayPrototypeUnshift(args, super.emit, this, event);
          return ReflectApply(asyncResource.runInAsyncScope, asyncResource,
                              args);
        }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emit', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.