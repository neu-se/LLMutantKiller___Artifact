let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest - iterator after consuming some ops', function(done) {
        let ops = [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } },
            { insert: '!' }
        ];
        let delta = new quill_delta(ops);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Consume first two operations
        iterator.next(5); // "Hello"
        iterator.next(1); // " "
        
        let rest = iterator.rest();
        let expected = [
            { insert: 'World', attributes: { bold: true } },
            { insert: '!' }
        ];
        assert.deepEqual(rest, expected);
        done();
    });
});