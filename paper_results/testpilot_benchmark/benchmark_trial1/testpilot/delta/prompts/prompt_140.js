The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat', function(done) {
        // Test 1: Basic concatenation with simple inserts
        const a = new quill_delta().insert('Hello');
        const b = new quill_delta().insert('!', { bold: true });
        const result = a.concat(b);
        
        assert.deepEqual(result.ops, [
            { insert: 'Hello' },
            { insert: '!', attributes: { bold: true } }
        ]);
        
        // Test 2: Concatenating empty deltas
        const empty1 = new quill_delta();
        const empty2 = new quill_delta();
        const emptyResult = empty1.concat(empty2);
        
        assert.deepEqual(emptyResult.ops, []);
        
        // Test 3: Concatenating with empty delta
        const nonEmpty = new quill_delta().insert('Text');
        const withEmpty = nonEmpty.concat(new quill_delta());
        
        assert.deepEqual(withEmpty.ops, [{ insert: 'Text' }]);
        
        // Test 4: Concatenating deltas with different operation types
        const insertDelta = new quill_delta().insert('Hello');
        const deleteDelta = new quill_delta().delete(5);
        const retainDelta = new quill_delta().retain(3);
        const mixed = insertDelta.concat(deleteDelta).concat(retainDelta);
        
        assert.deepEqual(mixed.ops, [
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3 }
        ]);
        
        // Test 5: Concatenating deltas with multiple operations
        const multi1 = new quill_delta().insert('A').retain(2).delete(1);
        const multi2 = new quill_delta().insert('B', { italic: true }).retain(1);
        const multiResult = multi1.concat(multi2);
        
        assert.deepEqual(multiResult.ops, [
            { insert: 'A' },
            { retain: 2 },
            { delete: 1 },
            { insert: 'B', attributes: { italic: true } },
            { retain: 1 }
        ]);
        
        // Test 6: Verify original deltas are not modified
        const original = new quill_delta().insert('Original');
        const toConcat = new quill_delta().insert(' Text');
        const concatenated = original.concat(toConcat);
        
        assert.deepEqual(original.ops, [{ insert: 'Original' }]);
        assert.deepEqual(toConcat.ops, [{ insert: ' Text' }]);
        assert.deepEqual(concatenated.ops, [
            { insert: 'Original' },
            { insert: ' Text' }
        ]);
        
        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

[
  {
    insert: 'A'
  },
  {
    retain: 2
  },
  {
    attributes: {
      italic: true
    },
    insert: 'B'
  },
  {
    delete: 1
  },
  {
    retain: 1
  }
]

should loosely deep-equal

[
  {
    insert: 'A'
  },
  {
    retain: 2
  },
  {
    delete: 1
  },
  {
    attributes: {
      italic: true
    },
    insert: 'B'
  },
  {
    retain: 1
  }
]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.