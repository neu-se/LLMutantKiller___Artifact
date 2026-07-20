let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with cursor parameter', function(done) {
        let delta1 = new Delta([{insert: 'ABC'}]);
        let delta2 = new Delta([{insert: 'AXBC'}]);
        let diff = delta1.diff(delta2, 1);
        assert.deepEqual(diff.ops, [{retain: 1}, {insert: 'X'}]);
        done();
    });

    })