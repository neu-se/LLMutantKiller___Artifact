let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test complex iteration scenario', function(done) {
        const ops = [
            { insert: 'Hello' },
            { retain: 3, attributes: { bold: true } },
            { delete: 2 },
            { insert: ' World' }
        ];
        const iterator = new quill_delta.OpIterator(ops);
        
        const results = [];
        while (iterator.hasNext()) {
            results.push(iterator.next(2));
        }
        
        assert.deepStrictEqual(results, [
            { insert: 'He' },
            { insert: 'llo' },
            { retain: 2, attributes: { bold: true } },
            { retain: 1, attributes: { bold: true } },
            { delete: 2 },
            { insert: ' W' },
            { insert: 'orld' }
        ]);
        done();
    });
});