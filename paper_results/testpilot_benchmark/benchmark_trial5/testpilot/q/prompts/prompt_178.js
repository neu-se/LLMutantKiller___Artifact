The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allResolved with all resolved promises', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.resolve(2);
        let promise3 = q.resolve(3);
        
        let combinedPromise = q.makePromise([promise1, promise2, promise3]);
        
        combinedPromise.allResolved().then(function(results) {
            assert.strictEqual(results.length, 3);
            assert.strictEqual(results[0].state, 'fulfilled');
            assert.strictEqual(results[0].value, 1);
            assert.strictEqual(results[1].state, 'fulfilled');
            assert.strictEqual(results[1].value, 2);
            assert.strictEqual(results[2].state, 'fulfilled');
            assert.strictEqual(results[2].value, 3);
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

0 !== 3
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.