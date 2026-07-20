let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - should catch rejection', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let errorMessage = 'Test error';
        
        promise.catch(function(error) {
            assert.strictEqual(error, errorMessage);
            done();
        });
        
        deferred.reject(errorMessage);
    });
    
    })