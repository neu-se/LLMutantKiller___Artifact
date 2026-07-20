let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - non-empty to empty', function(done) {
        let delta1 = new Delta([{insert: 'Hello'}]);
        let delta2 = new Delta();
        let diff = delta1.diff(delta2);
        assert.deepEqual(diff.ops, [{delete: 5}]);
        done();
    });
});