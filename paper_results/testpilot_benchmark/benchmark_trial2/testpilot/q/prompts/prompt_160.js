The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - error handling', function(done) {
        function asyncDivide(a, b, callback) {
            setTimeout(() => {
                if (b === 0) {
                    callback(new Error('Division by zero'));
                } else {
                    callback(null, a / b);
                }
            }, 10);
        }
        
        let promiseDivide = q.makePromise(asyncDivide);
        let boundDivide = promiseDivide.fbind(10, 0);
        
        boundDivide().then(() => {
            done(new Error('Should have thrown an error'));
        }).catch(err => {
            assert.equal(err.message, 'Division by zero');
            done();
        });
    });
    
    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_202.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.