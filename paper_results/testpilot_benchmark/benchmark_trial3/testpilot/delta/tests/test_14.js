let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should retain specified length', function(done) {
        let delta = new quill_delta();
        delta.retain(5);
        assert.deepEqual(delta.ops, [{ retain: 5 }]);
        done();
    });

    })