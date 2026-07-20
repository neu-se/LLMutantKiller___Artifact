let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - attribute removal', function(done) {
        const delta1 = new quill_delta([{insert: 'Hello', attributes: {bold: true, italic: true}}]);
        const delta2 = new quill_delta([{retain: 5, attributes: {bold: null}}]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello', attributes: {italic: true}}]);
        done();
    });
});