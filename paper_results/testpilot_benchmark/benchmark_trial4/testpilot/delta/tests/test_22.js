let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should merge consecutive retain operations with same attributes', function(done) {
        let delta = new quill_delta();
        delta.retain(3);
        delta.retain(2);
        assert.deepEqual(delta.ops, [{ retain: 5 }]);
        done();
    });

    })