let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test next method with insert operations', function(done) {
        const ops = [{ insert: 'Hello World' }];
        const iterator = new quill_delta.OpIterator(ops);
        
        // Get part of insert
        let result = iterator.next(5);
        assert.deepStrictEqual(result, { insert: 'Hello' });
        
        // Get remaining part
        result = iterator.next();
        assert.deepStrictEqual(result, { insert: ' World' });
        
        // Should return infinite retain when no more ops
        result = iterator.next();
        assert.deepStrictEqual(result, { retain: Infinity });
        done();
    });

    })