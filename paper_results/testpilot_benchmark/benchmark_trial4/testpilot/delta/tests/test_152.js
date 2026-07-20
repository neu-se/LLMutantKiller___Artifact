let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest - iterator with partial consumption', function(done) {
        let ops = [
            { insert: 'Hello World' },
            { insert: '!', attributes: { italic: true } }
        ];
        let delta = new quill_delta(ops);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Partially consume first operation
        iterator.next(5); // "Hello"
        
        let rest = iterator.rest();
        let expected = [
            { insert: ' World' },
            { insert: '!', attributes: { italic: true } }
        ];
        assert.deepEqual(rest, expected);
        done();
    });
});