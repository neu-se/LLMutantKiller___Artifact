The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { AsyncResource } = require('async_hooks');

describe('test dirty', function() {
    it('should emit events through EventEmitterAsyncResource', function(done) {
        const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
            name: 'test-resource'
        });
        
        emitter.on('test-event', (data) => {
            assert.strictEqual(data, 'test-data');
            done();
        });
        
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_229.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.