let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resolve with null value', function(done) {
        let promise = q.resolve(null);
        promise.then(function(value) {
            assert.strictEqual(value, null);
            done();
        }).catch(function(error) {
            done(error);
        });
    });
});