The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set nested property path', function(done) {
        let obj = {};
        q.set(obj, 'user.profile.name', 'Alice');
        assert.strictEqual(obj.user.profile.name, 'Alice');
        done();
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'profile')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.