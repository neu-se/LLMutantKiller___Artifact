let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict is a function', function(done) {
        assert.strictEqual(typeof q.noConflict, 'function', 'q.noConflict should be a function');
        done();
    });
});