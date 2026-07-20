let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with formatting', function(done) {
        let delta1 = new Delta([{insert: 'Hello', attributes: {bold: true}}, {insert: ' World'}]);
        let delta2 = new Delta([{insert: 'Hello', attributes: {bold: true}}, {insert: ' Beautiful World'}]);
        let diff = delta1.diff(delta2);
        assert.deepEqual(diff.ops, [{retain: 6}, {insert: 'Beautiful '}]);
        done();
    });

    })