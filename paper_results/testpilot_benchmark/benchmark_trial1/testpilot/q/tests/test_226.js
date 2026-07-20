let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - handles rejection', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
        
        deferred.reject(new Error('Test error'));
    });
    
    })