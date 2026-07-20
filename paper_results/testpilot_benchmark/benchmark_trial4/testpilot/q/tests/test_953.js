let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - returns a promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let catchPromise = promise.catch(function(error) {
            return 'handled';
        });
        
        assert(typeof catchPromise.then === 'function');
        
        catchPromise.then(function(value) {
            assert.equal(value, 'handled');
            done();
        });
        
        deferred.reject(new Error('Test error'));
    });
    
    })