The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - update non-existing key', function(done) {
        let db = dirty();
        
        db.update('nonExistentKey', function(doc) {
            return { created: true };
        }, function(err, updatedDoc) {
            assert.ifError(err);
            assert.strictEqual(updatedDoc.created, true);
            
            // Verify the value was created in the database
            let retrieved = db.get('nonExistentKey');
            assert.strictEqual(retrieved.created, true);
            done();
        });
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'created')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.