let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should handle non-function callbacks', function(done) {
        q.resolve('test')
            .tap('not a function')
            .then(function(result) {
                assert.strictEqual(result, 'test', 'Original value should be passed through');
                done();
            })
            .catch(done);
    });
});