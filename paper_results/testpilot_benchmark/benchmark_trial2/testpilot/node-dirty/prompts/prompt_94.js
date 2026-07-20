The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - with arguments', function(done) {
        let db = dirty();
        
        let listener = function(arg1, arg2, arg3) {
            assert.strictEqual(arg1, 'hello');
            assert.strictEqual(arg2, 42);
            assert.deepStrictEqual(arg3, { test: true });
            done();
        };
        
        db.prependOnceListener('args-test', listener);
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_140.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.