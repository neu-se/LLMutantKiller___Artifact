let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - error case', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate error callback
        let testError = new Error('test error');
        resolver(testError);
        
        deferred.promise.then(function(result) {
            done(new Error('Should not resolve on error'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
    
    })