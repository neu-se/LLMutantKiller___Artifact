The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with nested object', function(done) {
        let original = {
            user: {
                name: 'John',
                details: {
                    age: 30,
                    city: 'New York'
                }
            },
            items: [1, 2, 3]
        };
        
        let copied = q.passByCopy(original);
        
        // Should be a deep copy
        assert.notStrictEqual(copied, original);
        assert.notStrictEqual(copied.user, original.user);
        assert.notStrictEqual(copied.user.details, original.user.details);
        assert.notStrictEqual(copied.items, original.items);
        
        // Should have the same structure and values
        assert.deepEqual(copied, original);
        
        // Modifying nested properties should not affect original
        copied.user.details.age = 31;
        copied.items.push(4);
        
        assert.equal(original.user.details.age, 30);
        assert.equal(original.items.length, 3);
        assert.equal(copied.user.details.age, 31);
        assert.equal(copied.items.length, 4);
        
        done();
    });

    })
``` 
failed with the following error message:
```
Expected "actual" not to be reference-equal to "expected":

{
  items: [
    1,
    2,
    3
  ],
  user: {
    details: {
      age: 30,
      city: 'New York'
    },
    name: 'John'
  }
}
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.