The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - handles empty array', function(done) {
        q.makePromise.prototype.race.call({}, []).then(function(result) {
            // Should never resolve with empty array
            done(new Error('Should not resolve with empty array'));
        }).catch(function(error) {
            // Should never reject either, just hang indefinitely
            done(new Error('Should not reject with empty array'));
        });
        
        // Give it some time and then consider it passed if nothing happens
        setTimeout(() => done(), 50);
    });
    
    })
``` 
failed with the following error message:
```
this.then is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.