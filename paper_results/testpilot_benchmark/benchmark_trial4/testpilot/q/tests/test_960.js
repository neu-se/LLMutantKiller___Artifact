let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - should propagate new error if catch handler throws', function(done) {
        let promise = q.reject('original error');
        
        promise.catch(function(error) {
            throw new Error('new error');
        }).catch(function(error) {
            assert.strictEqual(error.message, 'new error');
            done();
        });
    });
});