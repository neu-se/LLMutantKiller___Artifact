let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - returns delta instance for chaining', function(done) {
        let delta = new quill_delta();
        let result = delta.push({ insert: 'hello' });
        assert.strictEqual(result, delta);
        done();
    });
});