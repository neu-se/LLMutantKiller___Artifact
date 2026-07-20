let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - add operation to empty delta', function(done) {
        let delta = new quill_delta();
        delta.push({ insert: 'hello' });
        assert.deepEqual(delta.ops, [{ insert: 'hello' }]);
        done();
    });

    })