let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('test error'));
        
        rejectedPromise.keys().then(function(keys) {
            done(new Error('should not resolve'));
        }).catch(function(error) {
            assert(error instanceof Error, 'should propagate rejection');
            assert.equal(error.message, 'test error', 'should preserve error message');
            done();
        });
    });
});