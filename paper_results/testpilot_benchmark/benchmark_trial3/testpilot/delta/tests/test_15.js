let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should retain with attributes', function(done) {
        let delta = new quill_delta();
        delta.retain(5, { bold: true });
        assert.deepEqual(delta.ops, [{ retain: 5, attributes: { bold: true } }]);
        done();
    });

    })