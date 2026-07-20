let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - rejected case', function(done) {
        let resolver;
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then(function(value) {
            done(new Error('Should not be fulfilled'));
        }, function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
        
        // Add a small delay to ensure resolver is set
        setTimeout(function() {
            if (resolver && resolver.reject) {
                resolver.reject(new Error('test error'));
            } else {
                done(new Error('Resolver not properly initialized'));
            }
        }, 0);
    });
});