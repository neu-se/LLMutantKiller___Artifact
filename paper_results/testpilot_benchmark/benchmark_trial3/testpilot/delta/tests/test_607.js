let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with formatting', function(done) {
        let delta1 = new Delta([{insert: 'Hello', attributes: {bold: true}}]);
        let delta2 = new Delta([{insert: 'Hello', attributes: {italic: true}}]);
        let diff = delta1.diff(delta2);
        assert.deepEqual(diff.ops, [{retain: 5, attributes: {bold: null, italic: true}}]);
        done();
    });
});