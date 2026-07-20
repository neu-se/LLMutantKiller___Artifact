let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test rest method', function(done) {
        const ops = [
            { insert: 'Hello' },
            { retain: 5 },
            { delete: 3 }
        ];
        const iterator = new quill_delta.OpIterator(ops);
        
        // At beginning
        let rest = iterator.rest();
        assert.deepStrictEqual(rest, ops);
        
        // After advancing completely through first op
        iterator.next();
        rest = iterator.rest();
        assert.deepStrictEqual(rest, [{ retain: 5 }, { delete: 3 }]);
        
        // After advancing partially through second op
        iterator.next(2);
        rest = iterator.rest();
        assert.deepStrictEqual(rest, [{ retain: 3 }, { delete: 3 }]);
        
        // After advancing through all ops
        iterator.next();
        iterator.next();
        rest = iterator.rest();
        assert.deepStrictEqual(rest, []);
        done();
    });

    })