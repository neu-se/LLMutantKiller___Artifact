let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest - iterator at beginning', function(done) {
        let ops = [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ];
        let delta = new quill_delta(ops);
        let iterator = new quill_delta.OpIterator(delta.ops);
        let rest = iterator.rest();
        assert.deepEqual(rest, ops);
        done();
    });
});