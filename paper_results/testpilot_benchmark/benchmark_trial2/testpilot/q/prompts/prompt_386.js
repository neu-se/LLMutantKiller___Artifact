The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should delete existing property', function(done) {
        let testObj = { name: 'John', age: 30, city: 'New York' };
        let result = q.delete(testObj, 'age');
        
        assert.strictEqual(testObj.hasOwnProperty('age'), false);
        assert.strictEqual(testObj.name, 'John');
        assert.strictEqual(testObj.city, 'New York');
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

true !== false
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.