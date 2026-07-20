let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with cursor parameter', function(done) {
        let delta1 = new Delta([{insert: 'Hello World'}]);
        let delta2 = new Delta([{insert: 'Hi World'}]);
        let cursor = {index: 0, length: 0};
        let diff = delta1.diff(delta2, cursor);
        assert.deepEqual(diff.ops, [{delete: 5}, {insert: 'Hi'}]);
        done();
    });

    })