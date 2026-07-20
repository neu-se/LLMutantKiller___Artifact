let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test next method with delete operations', function(done) {
        const ops = [{ delete: 7 }];
        const iterator = new quill_delta.OpIterator(ops);
        
        let result = iterator.next(3);
        assert.deepStrictEqual(result, { delete: 3 });
        
        result = iterator.next();
        assert.deepStrictEqual(result, { delete: 4 });
        done();
    });

    })