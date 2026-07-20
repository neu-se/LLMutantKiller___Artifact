let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - merge consecutive retain operations with same attributes', function(done) {
        let delta = new quill_delta([{ retain: 5 }]);
        delta.push({ retain: 3 });
        assert.deepEqual(delta.ops, [{ retain: 8 }]);
        done();
    });

    })