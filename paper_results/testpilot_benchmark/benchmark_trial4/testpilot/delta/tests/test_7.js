let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should compose deltas', function(done) {
        let delta1 = new Delta().insert('Hello');
        let delta2 = new Delta().retain(5).insert(' World');
        let composed = delta1.compose(delta2);
        assert.strictEqual(composed.ops.length, 1);
        assert.strictEqual(composed.ops[0].insert, 'Hello World');
        done();
    });

    })