let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test complex operation sequence', function(done) {
        const ops = [
            { insert: 'Hello', attributes: { bold: true } },
            { retain: 3 },
            { delete: 2 },
            { insert: ' World' }
        ];
        const iterator = new quill_delta.OpIterator(ops);
        
        // Process each operation
        let results = [];
        while (iterator.hasNext()) {
            results.push(iterator.next(2));
        }
        
        assert.deepStrictEqual(results, [
            { insert: 'He', attributes: { bold: true } },
            { insert: 'llo', attributes: { bold: true } },
            { retain: 2 },
            { retain: 1 },
            { delete: 2 },
            { insert: ' W' },
            { insert: 'orld' }
        ]);
        done();
    });
});