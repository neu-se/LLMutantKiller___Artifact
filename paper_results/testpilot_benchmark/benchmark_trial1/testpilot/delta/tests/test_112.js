let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map', function(done) {
        // Test 1: Map over empty delta
        let emptyDelta = new quill_delta();
        let mappedEmpty = emptyDelta.map(op => ({ ...op, mapped: true }));
        assert.deepEqual(mappedEmpty, []);

        // Test 2: Map over delta with insert operations
        let insertDelta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let mappedInsert = insertDelta.map(op => ({ ...op, length: op.insert ? op.insert.length : 0 }));
        assert.equal(mappedInsert.length, 2);
        assert.equal(mappedInsert[0].length, 5);
        assert.equal(mappedInsert[1].length, 6);
        assert.equal(mappedInsert[0].insert, 'Hello');
        assert.equal(mappedInsert[1].insert, ' World');

        // Test 3: Map over delta with retain and delete operations
        let mixedDelta = new quill_delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'test' }
        ]);
        let mappedMixed = mixedDelta.map(op => {
            if (op.retain) return { type: 'retain', value: op.retain };
            if (op.delete) return { type: 'delete', value: op.delete };
            if (op.insert) return { type: 'insert', value: op.insert };
            return op;
        });
        assert.equal(mappedMixed.length, 3);
        assert.deepEqual(mappedMixed[0], { type: 'retain', value: 5 });
        assert.deepEqual(mappedMixed[1], { type: 'delete', value: 3 });
        assert.deepEqual(mappedMixed[2], { type: 'insert', value: 'test' });

        // Test 4: Map with index parameter
        let indexDelta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        let mappedWithIndex = indexDelta.map((op, index) => ({ ...op, index }));
        assert.equal(mappedWithIndex[0].index, 0);
        assert.equal(mappedWithIndex[1].index, 1);
        assert.equal(mappedWithIndex[2].index, 2);

        // Test 5: Map returning different data types
        let numberDelta = new quill_delta([
            { insert: 'Hello' },
            { retain: 5 }
        ]);
        let mappedToStrings = numberDelta.map(op => JSON.stringify(op));
        assert.equal(typeof mappedToStrings[0], 'string');
        assert.equal(typeof mappedToStrings[1], 'string');
        assert.equal(mappedToStrings[0], '{"insert":"Hello"}');
        assert.equal(mappedToStrings[1], '{"retain":5}');

        done();
    });
});