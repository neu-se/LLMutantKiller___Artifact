let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - formatting attributes', function(done) {
        let delta1 = new quill_delta([{insert: 'Hello'}]);
        let delta2 = new quill_delta([{retain: 5, attributes: {bold: true}}]);
        let result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello', attributes: {bold: true}}]);
        done();
    });
});