The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with simple object', function(done) {
        let original = { name: 'test', value: 42 };
        let copied = q.passByCopy(original);
        
        // Should be a deep copy, not the same reference
        assert.notStrictEqual(copied, original);
        
        // Should have the same properties and values
        assert.deepEqual(copied, original);
        
        // Modifying the copy should not affect the original
        copied.name = 'modified';
        assert.equal(original.name, 'test');
        assert.equal(copied.name, 'modified');
        
        done();
    });

    })
``` 
failed with the following error message:
```
Expected "actual" not to be reference-equal to "expected":

{
  name: 'test',
  value: 42
}
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.