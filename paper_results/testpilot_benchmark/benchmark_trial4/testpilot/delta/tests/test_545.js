let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - complex attribute merging', function(done) {
        const delta1 = new quill_delta([
            {insert: 'Hello', attributes: {bold: true, color: 'red'}},
            {insert: ' World'}
        ]);
        const delta2 = new quill_delta([
            {retain: 5, attributes: {italic: true, color: 'blue'}},
            {retain: 6}
        ]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [
            {insert: 'Hello', attributes: {bold: true, italic: true, color: 'blue'}},
            {insert: ' World'}
        ]);
        done();
    });
});